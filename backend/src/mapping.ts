import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MappingEntity } from './entity/MappingEntity';
import { Repository } from 'typeorm';
import { ExcelMappingEntity } from './entity/ExcelMappingEntity';

import * as path from 'path';
import * as fs from 'fs';
import { WorkBook } from 'xlsx';


const csv = require('csv-parser');
const reader = require('xlsx');

@Injectable()
export class Mapping implements OnModuleInit, OnApplicationShutdown {
	constructor(
		@InjectRepository(MappingEntity) private readonly repository: Repository<MappingEntity>,
		@InjectRepository(ExcelMappingEntity) private readonly repositoryExcel: Repository<ExcelMappingEntity>
	) {
	}

	onApplicationShutdown(signal?: string): any {
	}

	async onModuleInit(): Promise<any> {
		if (process.env.REUPLOAD_DATA !== '1') {
			console.warn('DATA HASN\'T BEEN REUOPLOADED');
			return;
		}

		console.log('DELETE OLD TABLES');
		await this.repository.clear();
		await this.repositoryExcel.clear();

		await this.uploadCSV();
		await this.uploadExcel();
	}

	private async uploadExcel() {
		const file: WorkBook = reader.readFile(path.join(__dirname, '../../backend/db/sample/signals.xlsx'));

		let data = [];

		const sheets = file.SheetNames;

		for (let i = 0; i < 6; i++) {
			const page = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
			await this.mapExcelPage(i + 1, page);
		}

		console.log('excel_mapping_entity uploaded');
	}

	private async mapExcelPage(exhausterNumber: number, page) {
		const PLACE_EXCEL_KEY = 'Код сигнала в Kafka';
		const KEY_KEY = '__EMPTY_2';

		for (const [idx, row] of page.entries()) {
			const e = new ExcelMappingEntity();
			e.place = row[PLACE_EXCEL_KEY];
			e.mapping_key = row[KEY_KEY];

			e.is_temperature = this.isTemperatureIndex(idx);
			e.is_vibration_axial = this.isAxialVibrationIndex(idx);
			e.is_vibration_horizontal = this.isHorizontalVibrationIndex(idx);
			e.is_vibration_vertical = this.isVerticalVibrationIndex(idx);
			e.is_gas = this.isGasIndex(idx);
			e.is_oil = this.isOilIndex(idx);
			e.is_water = this.isWaterIndex(idx);

			e.pod_number = this.getPodNumberByIndex(idx);
			e.exhauster_number = exhausterNumber;

			await this.repositoryExcel.insert(e);
		}
	}

	private getPodNumberByIndex(index: number): number | null {
		if (index >= 0 && index <= 19) return 1;
		if (index >= 20 && index <= 39) return 2;
		if (index >= 40 && index <= 44) return 3;
		if (index >= 45 && index <= 49) return 4;
		if (index >= 50 && index <= 54) return 5;
		if (index >= 55 && index <= 59) return 6;
		if (index >= 60 && index <= 79) return 7;
		if (index >= 80 && index <= 99) return 8;
		if (index >= 100 && index <= 104) return 9;
		return null;
	}

	private isTemperatureIndex(index: number) {
		if (index >= 0 && index <= 4) {
			return true;
		}

		if (index >= 20 && index <= 24) {
			return true;
		}

		if (index >= 40 && index <= 65) {
			return true;
		}

		if (index >= 80 && index <= 84) {
			return true;
		}

		if (index >= 100 && index <= 104) {
			return true;
		}

		return false;
	}

	private isAxialVibrationIndex(index: number) {
		if (index >= 5 && index <= 9) {
			return true;
		}

		if (index >= 25 && index <= 29) {
			return true;
		}

		if (index >= 65 && index <= 69) {
			return true;
		}

		if (index >= 85 && index <= 89) {
			return true;
		}

		return false;
	}

	private isHorizontalVibrationIndex(index: number) {
		if (index >= 10 && index <= 14) {
			return true;
		}

		if (index >= 30 && index <= 34) {
			return true;
		}

		if (index >= 70 && index <= 74) {
			return true;
		}

		if (index >= 90 && index <= 94) {
			return true;
		}

		return false;
	}

	private isVerticalVibrationIndex(index: number) {
		if (index >= 15 && index <= 19) {
			return true;
		}

		if (index >= 35 && index <= 39) {
			return true;
		}

		if (index >= 75 && index <= 79) {
			return true;
		}

		if (index >= 95 && index <= 99) {
			return true;
		}

		return false;
	}

	private isWaterIndex(index: number) {
		if (index >= 107 && index <= 109) {
			return true;
		}
		return false;
	}

	private isOilIndex(index: number) {
		if (index >= 105 && index <= 106) {
			return true;
		}
		return false;
	}

	private isGasIndex(index: number) {
		if (index === 109) {
			return true;
		}
		return false;
	}

	private async uploadCSV() {
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
					const {type, comment, exhauster, active} = el;
					const place = el[Object.keys(el)[0]];

					const entity = new MappingEntity();
					entity.active = Number(active);
					entity.exhauster = Number(exhauster);
					entity.comment = comment;
					entity.type = type;
					entity.place = place;

					await this.repository.insert(entity);
				}

				console.log('mapping_entity uploaded');
			});
	}
}