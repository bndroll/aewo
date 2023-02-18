import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import * as fs from 'fs';
import { MappingEntity } from './entity/MappingEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExcelMappingEntity } from './entity/ExcelMappingEntity';
import { ExgMetricsService } from './exg-metrics/exg-metrics.service';
import {SocketService} from "./socket/socket.service";
import DataMapper from "./data-mapper";


const csv = require('csv-parser');
const reader = require('xlsx');

@Injectable()
export class Consumer implements OnModuleInit, OnApplicationShutdown {
	private readonly consumer;

	constructor(
		@InjectRepository(MappingEntity) private readonly repository: Repository<MappingEntity>,
		@InjectRepository(ExcelMappingEntity) private readonly repositoryExcel: Repository<ExcelMappingEntity>,
		private readonly metricsService: ExgMetricsService,
		private readonly socketService: SocketService,
		private readonly mapper: DataMapper
	) {
		const kafka = new Kafka({
			clientId: 'aewo',
			brokers: [process.env.KAFKA_HOST],
			ssl: {
				rejectUnauthorized: false,
				ca: [fs.readFileSync(process.env.KAFKA_CERT, 'utf-8')]
			},
			sasl: {
				mechanism: 'scram-sha-512', // scram-sha-256 or scram-sha-512
				username: process.env.KAFKA_USER,
				password: process.env.KAFKA_PASS
			}
		});
		this.consumer = kafka.consumer({groupId: 'aewo-group'});
	}

	onApplicationShutdown(signal?: string): any {
	}

	async onModuleInit(): Promise<any> {
		await this.consumer.connect();
		await this.consumer.subscribe({topic: process.env.KAFKA_TOPIC, fromBeginning: true});
		await this.consumer.run({
			eachMessage: async ({topic, partition, message}) => {
				// like      "SM_Exgauster\\[0:45]": 45.5
				const value: Record<string, number> = JSON.parse(message.value.toString());
				const momentTime = new Date(value.moment).getTime();
				let data = {...value};
				// @ts-ignore
				delete data.moment;
				// @ts-ignore

				await Promise.all([
					this.metricsService.insertMetric({
						moment: momentTime,
						exg_data: data
					}),
					this.emitDataToSocket(data)
				])

				console.log({
					partition,
					offset: message.offset
				});
			}
		});
	}

	async emitDataToSocket(data: Record<string, number>) {
		const dataForEmit = await this.mapper.map(data);
		// fs.writeFileSync('/Users/a.akutin/Desktop/sample.json', JSON.stringify(dataForEmit['1']));
		// throw new Error('FUCK');
		this.socketService.emitData(dataForEmit);
	}
}