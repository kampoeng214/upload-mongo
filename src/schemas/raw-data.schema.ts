// src/schemas/raw-data.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RawData extends Document {
  @Prop({ required: true })
  enodebId: string;

  @Prop({ required: true })
  cellId: string;

  @Prop({ required: true })
  resultTime: Date;

  @Prop({ required: true })
  availDur: number;
}

export const RawDataSchema = SchemaFactory.createForClass(RawData);
