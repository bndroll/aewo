import { Module } from '@nestjs/common';
import { ExgMetricsService } from './exg-metrics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExgMetric, ExgMetricSchema } from './entities/exg-metric.entity';


@Module({
	imports: [MongooseModule.forFeature([{name: ExgMetric.name, schema: ExgMetricSchema}])],
	providers: [ExgMetricsService],
	exports: [ExgMetricsService]
})
export class ExgMetricsModule {
}
