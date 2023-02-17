import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SocketModule } from './socket/socket.module';
import {Consumer} from "./consumer";
import {MappingEntity} from "./entity/MappingEntity";
import {ExcelMappingEntity} from "./entity/ExcelMappingEntity";
import {Mapping} from "./mapping";


@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			autoLoadEntities: true,
			synchronize: true,
			migrations: []
		}),
		TypeOrmModule.forFeature([ MappingEntity, ExcelMappingEntity ]),
		RedisModule.forRoot({
			config: {
				host: process.env.REDIS_HOST,
				port: parseInt(process.env.REDIS_PORT ?? '6379')
			}
		}),
		ClickHouseModule.register([
			{
				name: 'EXG_METRICS',
				host: process.env.CLICKHOUSE_HOST,
				database: process.env.CLICKHOUSE_DB,
				port: parseInt(process.env.CLICKHOUSE_PORT ?? '8123'),
				httpConfig: {}
			}
		]),
		ClientsModule.register([
			{
				name: 'KAFKA_SERVICE',
				transport: Transport.KAFKA,
			}
		])
	],
	controllers: [AppController],
	providers: [AppService, Consumer, Mapping]
})
export class AppModule {
}
