import { Injectable } from '@nestjs/common';
import { ExgMetric } from './entities/exg-metric.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ExgMetricsService {
	constructor(
		@InjectModel(ExgMetric.name) private readonly exgMetric: Model<ExgMetric>
	) {
		this.insertMetric({moment: 123456, exg_data: '{"qioneniquwe": "qweqeqewwq", "qeqeqeq": 12313}'});
		this.findMetric(5).then(r => console.log(r));
	}

	async insertMetric(metric: ExgMetric) {
		await new this.exgMetric({
			moment: metric.moment,
			exg_data: metric.exg_data
		}).save();
	}

	async findMetric(limit: number) {
		return this.exgMetric.find().limit(limit);
	}
}
