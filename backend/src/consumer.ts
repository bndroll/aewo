import {Injectable, OnApplicationShutdown, OnModuleInit} from "@nestjs/common";
import {Kafka} from "kafkajs";
import * as fs from "fs";
import * as path from "path";
import {MappingEntity} from "./entity/MappingEntity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

const csv = require('csv-parser');

@Injectable()
export class Consumer implements OnModuleInit, OnApplicationShutdown {
    private readonly consumer;
    constructor(@InjectRepository(MappingEntity) private readonly repository: Repository<MappingEntity>) {
        const kafka = new Kafka({
            clientId: 'aewo',
            brokers: [process.env.KAFKA_HOST],
            ssl: {
                rejectUnauthorized: false,
                ca: [fs.readFileSync(process.env.KAFKA_CERT, 'utf-8')],
            },
            sasl: {
                mechanism: 'scram-sha-512', // scram-sha-256 or scram-sha-512
                username: process.env.KAFKA_USER,
                password: process.env.KAFKA_PASS
            },
        })
        this.consumer = kafka.consumer({ groupId: 'aewo-group' })
    }
    onApplicationShutdown(signal?: string): any {
    }

    async onModuleInit(): Promise<any> {
        // await this.consumer.connect()
        // await this.consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true })
        // await this.consumer.run({
        //     eachMessage: async ({ topic, partition, message }) => {
        //         // like      "SM_Exgauster\\[0:45]": 45.5
        //         const value: Record<string, number> = JSON.parse(message.value.toString())
        //         console.log({
        //             partition,
        //             offset: message.offset,
        //         })
        //     },
        // })


        // const results: {
        //     place: string,
        //     type: string,
        //     comment: string,
        //     exhauster: string,
        //     active: string
        // }[] = [];

        // РАСКОМЕНТИТЬ ДЛЯ ЗАГРУЗКИ
        // fs.createReadStream(path.join(__dirname, '../../backend/db/sample/signals_kafka.csv'))
        //     .pipe(csv())
        //     .on('data', (data) => results.push(data))
        //     .on('end', async () => {
        //         for (const el of results) {
        //             const { type, comment, exhauster, active } = el;
        //             const place = el[Object.keys(el)[0]];
        //
        //             const entity = new MappingEntity();
        //             entity.active = Number(active);
        //             entity.exhauster = Number(exhauster);
        //             entity.comment = comment;
        //             entity.type = type;
        //             entity.place = place;
        //
        //             await this.repository.insert(entity)
        //         }
        //     });

    }
}