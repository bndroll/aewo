import {Injectable, OnApplicationShutdown, OnModuleInit} from "@nestjs/common";
import {Kafka} from "kafkajs";
import * as fs from "fs";
import * as path from "path";
import {MappingEntity} from "./entity/MappingEntity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ExcelMappingEntity} from "./entity/ExcelMappingEntity";

const csv = require('csv-parser');
const reader = require('xlsx')

@Injectable()
export class Consumer implements OnModuleInit, OnApplicationShutdown {
    private readonly consumer;
    constructor(
        @InjectRepository(MappingEntity) private readonly repository: Repository<MappingEntity>,
        @InjectRepository(ExcelMappingEntity) private readonly repositoryExcel: Repository<ExcelMappingEntity>
    ) {
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

        // РАСКОМЕНТИТЬ ДЛЯ ЗАГРУЗКИ

        // const results: {
        //     place: string,
        //     type: string,
        //     comment: string,
        //     exhauster: string,
        //     active: string
        // }[] = [];
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


// Reading our test file
//         const file = reader.readFile(path.join(__dirname, '../../backend/db/sample/signals.xlsx'))
//         const PLACE_EXCEL_KEY = 'Код сигнала в Kafka';
//         const KEY_KEY = '__EMPTY_2';
//         let data = []
//
//         const sheets = file.SheetNames
//
//         for (let i = 0; i < 6; i++) {
//             const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
//
//             for (const res of temp) {
//                 const e = new ExcelMappingEntity();
//                 e.place = res[PLACE_EXCEL_KEY];
//                 e.key =  res[KEY_KEY];
//
//                 await this.repositoryExcel.insert(e);
//             }
//         }
//

    }
}