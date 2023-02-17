import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SocketModule } from './socket/socket.module';


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
			synchronize: true
		}),
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
				options: {
					client: {
						brokers: ['rc1a-b5e65f36lm3an1d5.mdb.yandexcloud.net:9091'],
						sasl: {
							mechanism: 'scram-sha-512',
							username: '9433_reader',
							password: 'eUIpgWu0PWTJaTrjhjQD3.hoyhntiK',
						}
					},
					consumer: {
						groupId: 'aewo-consumer'
					}
				}
			}
		]),
		SocketModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
}
