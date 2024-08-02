// src/csv/csv.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as csvParser from 'csv-parser';
import { RawData } from '../schemas/raw-data.schema';
import { Readable } from 'stream';

@Injectable()
export class CsvService {
  constructor(@InjectModel(RawData.name) private readonly rawDataModel: Model<RawData>) {}

  async parseAndSaveCsv(file: Express.Multer.File): Promise<void> {
    const stream = Readable.from(file.buffer);
    
    return new Promise((resolve, reject) => {
      stream.pipe(csvParser())
        .on('data', async (data) => {
          const { enodebId, cellId, resultTime, availDur } = data;
          await this.rawDataModel.updateOne(
            { enodebId, cellId, resultTime: new Date(resultTime) },
            { enodebId, cellId, resultTime: new Date(resultTime), availDur },
            { upsert: true }
          );
        })
        .on('end', () => resolve())
        .on('error', reject);
    });
  }
}
