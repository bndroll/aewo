import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class ExgMetric {
	@Prop({required: true})
	moment: number;

	@Prop({type: Object})
	exg_data: Object;
}

export const ExgMetricSchema = SchemaFactory.createForClass(ExgMetric);
