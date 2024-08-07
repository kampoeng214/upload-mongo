// src/csv/csv.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors, Get, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { RawData } from '../schemas/raw-data.schema';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.csvService.parseAndSaveCsv(file);
    return { message: 'File uploaded and data saved successfully!' };
  }

  @Get('all')
  async getAllDocuments(): Promise<RawData[]> {
    return this.csvService.getAllData();
  }

  @Get('graph')
  async getGraph(
    @Query('enodebId') enodebId: string, 
    @Query('cellId') cellId: string, 
    @Query('startDate') startDate: string, 
    @Query('endDate') endDate: string
  ): Promise<any> {
    return this.csvService.getGraph(enodebId, cellId, startDate, endDate);
  }
}
