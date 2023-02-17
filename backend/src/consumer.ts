import {Injectable, OnApplicationShutdown, OnModuleInit} from "@nestjs/common";
import {Kafka} from "kafkajs";
import * as fs from "fs";

const kafka = new Kafka({
    clientId: 'aewo',
    brokers: ['rc1a-b5e65f36lm3an1d5.mdb.yandexcloud.net:9091'],
    ssl: {
        rejectUnauthorized: false,
        ca: [fs.readFileSync('/usr/local/share/ca-certificates/Yandex/YandexCA.crt', 'utf-8')],
    },
    sasl: {
        mechanism: 'scram-sha-512', // scram-sha-256 or scram-sha-512
        username: '9433_reader',
        password: 'eUIpgWu0PWTJaTrjhjQD3.hoyhntiK'
    },
})
const consumer = kafka.consumer({ groupId: 'aewo-group' })

@Injectable()
export class Consumer implements OnModuleInit, OnApplicationShutdown {
    onApplicationShutdown(signal?: string): any {
    }

    async onModuleInit(): Promise<any> {
        await consumer.connect()
        await consumer.subscribe({ topic: 'zsmk-9433-dev-01', fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                // like      "SM_Exgauster\\[0:45]": 45.5
                const value: Record<string, number> = JSON.parse(message.value.toString())
                console.log({
                    partition,
                    offset: message.offset,
                })
            },
        })
    }
}