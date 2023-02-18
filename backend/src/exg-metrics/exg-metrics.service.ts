import { Injectable } from '@nestjs/common';
import { ExgMetric } from './entities/exg-metric.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ExgMetricsService {
	constructor(
		@InjectModel(ExgMetric.name) private readonly exgMetric: Model<ExgMetric>
	) {
	}

	async insertMetric(metric: ExgMetric) {
		await new this.exgMetric({
			moment: metric.moment,
			exg_data: metric.exg_data
		}).save();
	}

	async findMetric(limit: number) {
		return await this.exgMetric.find().sort({_id: -1}).limit(limit).exec();
	}
}
