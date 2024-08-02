// src/csv/csv.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { RawDataSchema } from '../schemas/raw-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'RawData', schema: RawDataSchema }]),
  ],
  controllers: [CsvController],
  providers: [CsvService],
})
export class CsvModule {}
