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

    const expenses = await this.prisma.db.orm.public.Transaction
                    .where((t) => t.date.gte(startDate))
                    .where((t) => t.date.lt(endDate))
                    .where((type) => type.category.some(c => c.type.eq("EXPENSE")))
                    .all();

    const totalCents = expenses.reduce((acc, t) => {
      const [integer, decimal] = t.value.split('.');
      const cents = BigInt(integer) * 100n + BigInt(decimal);
      return acc + cents;
    }, 0n);

    const expenseSum = `${totalCents/100n}.${(totalCents%100n).toString().padStart(2, '0')}`;

    return {month, year, totalExpenses: expenseSum, transactionsCount: expenses.length, transactions: expenses}
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
