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
		return await this.metricsService.findMetric(6);
	}
}
