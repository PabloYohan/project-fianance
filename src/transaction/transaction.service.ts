import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { UpdateTransactionDto } from './dto/update-transaction.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Money } from '../common/money.type.js';
import { FilterTransactionDto } from './dto/filter-transaction.dto.js';

@Injectable()
export class TransactionService {

  constructor(
    @Inject(PrismaService)
    private readonly prisma : PrismaService
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const {categoryId, description, value } = createTransactionDto;

    const category = await this.prisma.db.orm.public.Category.where({ id: categoryId }).first();

    if(!category){
      throw new NotFoundException(
        `Não foi encontrada a categoria com id ${categoryId}`
      );
    }

    if(!category.active){
      throw new BadRequestException(
        `Não é possível criar um lançamento com uma categoria inativa`
      );
    }

    const date = createTransactionDto.date ? new Date(createTransactionDto.date) : new Date();

    return this.prisma.db.orm.public.Transaction.create({categoryId, description, value: value as Money, date});

  }

  async findAll(filter: FilterTransactionDto) {
    const {startDate, endDate, categoryId} = filter;

    let query = this.prisma.db.orm.public.Transaction;

    if(startDate){
      query = query.where((time) => 
        time.date.gte(new Date(`${startDate}T00:00:00.000Z`))
      );
    }

    if(endDate){
      const nextday = new Date(`${endDate}T00:00:00.000Z`)
      nextday.setUTCDate(nextday.getUTCDate() + 1);

      query = query.where((time) => time.date.lt(nextday));
    }

    if(categoryId !== undefined){
      query = query.where({categoryId});
    }

    return query.orderBy((time) => time.date.desc()).all();
  }

  async findOne(id: string) {
    const transaction = await this.prisma.db.orm.public.Transaction.where({id}).first();

    if(!transaction){
      throw new NotFoundException(
        `Não foi possível encontrar o lançamento com id ${id}`
      );
    }

    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {

    if(Object.keys(updateTransactionDto).length === 0){
      throw new BadRequestException(
        `Informe pelo menos 1 campo para a alteração`
      );
    }

    const {value, date, ...rest} = updateTransactionDto; 

    const transaction = await this.prisma.db.orm.public.Transaction.where({id}).update({
      ...rest,
      ...(value !== undefined && {
        value: value as Money
      }),
      ...(date !== undefined && {
        date: new Date(date)
      })
    });

    if(!transaction){
      throw new NotFoundException(
        `Não foi possível encontrar o lançamento com id ${id}`
      );
    }


  }

  async remove(id: string) {
    const transaction = await this.prisma.db.orm.public.Transaction.where({id}).delete();

    if(!transaction){
      throw new NotFoundException(
        `Não foi encontrada a transaction de id ${id}`
      )
    }

    return transaction;
  }
}
