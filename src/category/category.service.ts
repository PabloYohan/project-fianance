import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}
  
  async create(createCategoryDto: CreateCategoryDto) {
    const { name, type, active } = createCategoryDto;

    return this.prisma.db.orm.public.Category.create({name, type, active});
  }

  async findAll() {
    return this.prisma.db.orm.public.Category.all();
  }

  async findOne(id: number) {
    const category = this.prisma.db.orm.public.Category.where({id}).first();

    if(!category){
      throw new NotFoundException(
        `Não foi encontrada a categoria com id ${id}`,
      );
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {

    if(Object.keys(updateCategoryDto).length === 0){
      throw new BadRequestException(
        `Informe pelo menos um campo para fazer a atualização dos dados`,
      )
    }

    const category = await this.prisma.db.orm.public.Category.where({id}).update(updateCategoryDto);

    if(!category){
      throw new NotFoundException(
        `Não foi encontrada a categoria com id ${id}`,
      );
    }

    return category;
  }

  async remove(id: number) {
    const category = await this.prisma.db.orm.public.Category.where({id}).delete();

    if(!category){
      throw new NotFoundException(
        `Não encontrado a categoria com id ${id} para a exclusão`
      )
    }

    return category;
  }

  async disable(id: number){
    const category = await this.prisma.db.orm.public.Category.where({id}).update({active: false});

    if(!category){
      throw new NotFoundException(
        `Não encontrado a categoria com id ${id} para a inativação`
      )
    }

    return category;
  }

  async enable(id: number){
    const category = await this.prisma.db.orm.public.Category.where({id}).update({active: true});

    if(!category){
      throw new NotFoundException(
        `Não encontrado a categoria com id ${id} para a ativação`
      )
    }

    return category;
  }
}
