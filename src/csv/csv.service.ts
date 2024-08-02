// src/csv/csv.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { RawData } from '../schemas/raw-data.schema';

@Injectable()
export class CsvService {
  constructor(@InjectModel('RawData') private readonly rawDataModel: Model<RawData>) {}

  async parseAndSaveCsv(file: Express.Multer.File): Promise<void> {
    const stream = Readable.from(file.buffer);
    
    return new Promise((resolve, reject) => {
      stream.pipe(csvParser())
        .on('data', async (data) => {
          const { enodebId, cellId, resultTime, availDur } = data;
          // Ensure resultTime is a valid Date object
          const resultTimeDate = new Date(resultTime);
          
          await this.rawDataModel.updateOne(
            { enodebId, cellId, resultTime: resultTimeDate },
            { enodebId, cellId, resultTime: resultTimeDate, availDur },
            { upsert: true }
          );
        })
        .on('end', () => resolve())
        .on('error', reject);
    });
  }

  async getAllData(): Promise<RawData[]> {
    return this.rawDataModel.find().exec();
  }
}
