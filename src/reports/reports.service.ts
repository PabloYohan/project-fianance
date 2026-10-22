import { Inject, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto.js';
import { UpdateReportDto } from './dto/update-report.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ExpenseMonthlyDto } from './dto/expense-monthly.dto.js';

@Injectable()
export class ReportsService {

  constructor(
    @Inject(PrismaService)
    private readonly prisma : PrismaService
  ){}

  getAllExpensesForMonth(filter: ExpenseMonthlyDto) {
    
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
