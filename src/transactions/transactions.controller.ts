import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { WalletsService } from 'src/wallets/wallets.service';
import { HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { parse } from 'path';
import { getBalance } from 'src/wallets/wallets.controller';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      const walletId = createTransactionDto.walletId;

      let wallet = await this.prisma.wallet.findUnique({
        where: { id: walletId },
        include: { transactions: true },
      });
      const balance = getBalance(wallet.transactions);
      if (
        createTransactionDto.type === 'debit' &&
        (balance < 0 || balance < createTransactionDto.amount)
      ) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      return this.transactionsService.create(createTransactionDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
