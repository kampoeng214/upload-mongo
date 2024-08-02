// src/app.module.ts
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to your static files
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/full'), // Change the URI as needed
    CsvModule,
  ],
})
export class AppModule {}
