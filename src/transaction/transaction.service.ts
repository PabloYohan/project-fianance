import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { UpdateTransactionDto } from './dto/update-transaction.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Money } from '../common/money.type.js';

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

    const transaction = await this.prisma.db.orm.public.Transaction.create({categoryId, description, value: value as Money, date});


  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
