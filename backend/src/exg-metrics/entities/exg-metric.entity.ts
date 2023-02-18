import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class ExgMetric {
	@Prop({required: true})
	moment: number;

	@Prop({required: true})
	exg_data: string;
}

export const ExgMetricSchema = SchemaFactory.createForClass(ExgMetric);
