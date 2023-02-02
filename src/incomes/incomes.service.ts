import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IncomesService {
  constructor(private prisma: PrismaService) {}

  create(createIncomeDto: CreateIncomeDto) {
    return this.prisma.income.create(createIncomeDto);
  }

  findAll() {
    return this.prisma.income.findMany();
  }

  findOne(id: string) {
    return this.prisma.income.findFirst({ where: { id } });
  }

  update(id: string, updateIncomeDto: UpdateIncomeDto) {
    return this.prisma.income.update({ where: { id }, data: updateIncomeDto });
  }

  remove(id: string) {
    return this.prisma.income.delete({ where: { id } });
  }
}
