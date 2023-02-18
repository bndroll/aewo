import { Injectable } from '@nestjs/common';
import DataMapper from './data-mapper';
import { ExgMetricsService } from './exg-metrics/exg-metrics.service';


@Injectable()
export class AppService {
	constructor(
		private readonly dataMapper: DataMapper,
		private readonly metricsService: ExgMetricsService
	) {
	}

	async getLastInfo() {
		const item = (await this.metricsService.findMetric(1))[0];
		return await this.dataMapper.map(item.exg_data as Record<string, number>);
	}
}
