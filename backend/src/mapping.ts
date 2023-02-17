import {Injectable, OnApplicationShutdown, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MappingEntity} from "./entity/MappingEntity";
import {Repository} from "typeorm";
import {ExcelMappingEntity} from "./entity/ExcelMappingEntity";

import * as path from "path";
import * as fs from "fs";

const csv = require('csv-parser');
const reader = require('xlsx')

@Injectable()
export class Mapping implements OnModuleInit, OnApplicationShutdown {
    constructor(
        @InjectRepository(MappingEntity) private readonly repository: Repository<MappingEntity>,
        @InjectRepository(ExcelMappingEntity) private readonly repositoryExcel: Repository<ExcelMappingEntity>
    ) {}

    onApplicationShutdown(signal?: string): any {
    }

    async onModuleInit(): Promise<any> {
        if (process.env.REUPLOAD_DATA !== '1') {
            console.warn("DATA HASN'T BEEN REUOPLOADED")
            return ;
        }

        console.log('DELETE OLD TABLES');
        await this.repository.clear();
        await this.repositoryExcel.clear();

        const results: {
            place: string,
            type: string,
            comment: string,
            exhauster: string,
            active: string
        }[] = [];

        fs.createReadStream(path.join(__dirname, '../../backend/db/sample/signals_kafka.csv'))
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for (const el of results) {
                    const { type, comment, exhauster, active } = el;
                    const place = el[Object.keys(el)[0]];

                    const entity = new MappingEntity();
                    entity.active = Number(active);
                    entity.exhauster = Number(exhauster);
                    entity.comment = comment;
                    entity.type = type;
                    entity.place = place;

                    await this.repository.insert(entity)
                }

                console.log('mapping_entity uploaded')
            });

        const file = reader.readFile(path.join(__dirname, '../../backend/db/sample/signals.xlsx'))
        const PLACE_EXCEL_KEY = 'Код сигнала в Kafka';
        const KEY_KEY = '__EMPTY_2';
        let data = []

        const sheets = file.SheetNames

        for (let i = 0; i < 6; i++) {
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])

            for (const res of temp) {
                const e = new ExcelMappingEntity();
                e.place = res[PLACE_EXCEL_KEY];
                e.key =  res[KEY_KEY];

                await this.repositoryExcel.insert(e);
            }
        }

        console.log('excel_mapping_entity uploaded')
    }

}