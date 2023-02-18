import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { SocketModule } from './socket/socket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './config/mongo.config';
import { ExgMetricsModule } from './exg-metrics/exg-metrics.module';
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
		MongooseModule.forRootAsync(getMongoConfig()),
		SocketModule,
		ExgMetricsModule
	],
	controllers: [AppController],
	providers: [AppService, Consumer, Mapping]
})
export class AppModule {
}
