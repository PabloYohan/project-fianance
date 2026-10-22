import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CategoryModule } from './category/category.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { TransactionModule } from './transaction/transaction.module.js';
import { ReportsModule } from './reports/reports.module.js';

@Module({
  imports: [CategoryModule, PrismaModule, TransactionModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
