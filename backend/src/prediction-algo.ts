import { Injectable } from '@nestjs/common';
import { PodState } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { ExcelMappingEntity } from './entity/ExcelMappingEntity';
import { In, Repository } from 'typeorm';


@Injectable()
export default class PredictionAlgo {
	private entities: ExcelMappingEntity[] = [];

	constructor(
		@InjectRepository(ExcelMappingEntity) private readonly repositoryExcel: Repository<ExcelMappingEntity>
	) {
	}

	private async getEntities() {
		if (this.entities.length === 0) {
			this.entities = await this.repositoryExcel.find({where: {pod_number: In([7, 8])}});
		}

		return this.entities;
	}

	async getPod7State(exhausterNum: number, values: Record<string, number>): Promise<PodState> {
		const entities = (await this.getEntities()).filter((el) => el.exhauster_number === exhausterNum && el.pod_number === 7);

		const {
			horizontalAlarmValue,
			horizontalWarningValue,
			horizontalVibrationValue,

			verticalAlarmValue,
			verticalWarningValue,
			verticalVibrationValue
		} = this.getPodValues(entities);

		if (
			horizontalVibrationValue >= horizontalAlarmValue
			|| verticalVibrationValue >= verticalAlarmValue
		) {
			return PodState.ALARM;
		}

		if (
			horizontalVibrationValue >= horizontalWarningValue
			|| verticalVibrationValue >= verticalWarningValue
		) {
			return PodState.WARNING;
		}

		return PodState.NORMAL;
	}

	async getPod8State(exhausterNum: number, values: Record<string, number>): Promise<PodState> {
		const entities = (await this.getEntities()).filter((el) => el.exhauster_number === exhausterNum && el.pod_number === 8);

		const {
			horizontalAlarmValue,
			horizontalWarningValue,
			horizontalVibrationValue,

			verticalAlarmValue,
			verticalWarningValue,
			verticalVibrationValue
		} = this.getPodValues(entities);

		if (
			horizontalVibrationValue >= horizontalAlarmValue
			|| verticalVibrationValue >= verticalAlarmValue
		) {
			return PodState.ALARM;
		}

		if (
			horizontalVibrationValue >= horizontalWarningValue
			|| verticalVibrationValue >= verticalWarningValue
		) {
			return PodState.WARNING;
		}

		return PodState.NORMAL;
	}

	private getPodValues(entities: ExcelMappingEntity[]) {
		const horizontalVibrationValue = entities.find((el) => el.is_vibration_horizontal && el.mapping_key === 'vibration_horizontal');
		const horizontalWarningValue = entities.find((el) => el.is_vibration_horizontal && el.mapping_key === 'warning_max');
		const horizontalAlarmValue = entities.find((el) => el.is_vibration_horizontal && el.mapping_key === 'alarm_max');

		const verticalVibrationValue = entities.find((el) => el.is_vibration_vertical && el.mapping_key === 'vibration_vertical');
		const verticalWarningValue = entities.find((el) => el.is_vibration_vertical && el.mapping_key === 'warning_max');
		const verticalAlarmValue = entities.find((el) => el.is_vibration_vertical && el.mapping_key === 'alarm_max');

		return {
			horizontalAlarmValue,
			horizontalWarningValue,
			horizontalVibrationValue,

			verticalAlarmValue,
			verticalWarningValue,
			verticalVibrationValue
		};
	}
}