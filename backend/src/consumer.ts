import {Injectable, OnApplicationShutdown, OnModuleInit} from '@nestjs/common';
import {Kafka} from 'kafkajs';
import * as fs from 'fs';
import {MappingEntity} from './entity/MappingEntity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ExcelMappingEntity} from './entity/ExcelMappingEntity';
import {ExgMetricsService} from './exg-metrics/exg-metrics.service';
import {SocketService} from "./socket/socket.service";
import DataMapper from "./data-mapper";
import PredictionAlgo from "./prediction-algo";
import {PodState} from "./types";


const csv = require('csv-parser');
const reader = require('xlsx');

const GreenSMS = require("greensms");
// Register at my.greeensms.ru first


@Injectable()
export class Consumer implements OnModuleInit, OnApplicationShutdown {
	private readonly consumer;
	private readonly client;

	constructor(
		@InjectRepository(MappingEntity) private readonly repository: Repository<MappingEntity>,
		@InjectRepository(ExcelMappingEntity) private readonly repositoryExcel: Repository<ExcelMappingEntity>,
		private readonly metricsService: ExgMetricsService,
		private readonly socketService: SocketService,
		private readonly mapper: DataMapper,
		private readonly algo: PredictionAlgo
	) {
		try {
			this.client = new GreenSMS({ user: process.env.SMS_USER, pass: process.env.SMS_PASS });
		} catch (e) {
			console.error('Error while initing sms client')
		}
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
					this.emitDataToSocket(data),
					this.checkPodsState(data)
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
		this.socketService.emitData(dataForEmit);
	}

	async checkPodsState(data: Record<string, number>) {
		for (let i = 1; i < 7; i++) {
			// i - num of exhauster
			const state7 = await this.algo.getPod7State(i, data);
			const state8 = await this.algo.getPod8State(i, data);

			if (state8 === PodState.ALARM || state7 === PodState.ALARM) {
				this.client.sms
					.send({
						to: process.env.WATCHER_NUMBER,
						txt: `Внимание! Датчики для эсгаустера под номером ${i} показывают критическое значение`,
					});
			}

			if (state8 === PodState.WARNING || state7 === PodState.WARNING) {
				this.client.sms
					.send({
						to: process.env.WATCHER_NUMBER,
						txt: `Внимание! Датчики для эсгаустера под номером ${i} показывают значение в зоне опасности`,
					});
			}
		}
	}
}