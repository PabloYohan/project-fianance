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

  async getAllExpensesForMonth(filter: ExpenseMonthlyDto) {
    const { month, year } = filter;

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    const query = this.prisma.db.orm.public.Transaction
                    .where((t) => t.date.gte(startDate))
                    .where((t) => t.date.lt(endDate))
                    .where((type) => type.category.some(c => c.type.eq("EXPENSE")));


    const [summary, expenses] = await Promise.all([
      query.aggregate((agg) => ({
        total: agg.sum('value'),
        count: agg.count()
      })),

      query.orderBy(t => t.date.desc()).all()
    ])

    return {month, year, totalExpenses: summary.total ?? "0.00", transactionsCount: summary.count, transactions: expenses}
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
