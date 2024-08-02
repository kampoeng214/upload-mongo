// src/schemas/raw-data.schema.ts
import { Schema, Document } from 'mongoose';

export interface RawData extends Document {
  enodebId: string;
  cellId: string;
  resultTime: Date;
  availDur: number;
}

export const RawDataSchema = new Schema({
  enodebId: { type: String, required: true },
  cellId: { type: String, required: true },
  resultTime: { type: Date, required: true },
  availDur: { type: Number, required: true },
});
