// src/csv/csv.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RawData, RawDataSchema } from '../schemas/raw-data.schema';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: RawData.name, schema: RawDataSchema }])],
  providers: [CsvService],
  controllers: [CsvController],
})
export class CsvModule {}
