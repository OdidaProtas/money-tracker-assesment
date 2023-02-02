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
@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly walletService: WalletsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      const walletId = createTransactionDto.walletId;

      let wallet = await this.walletService.findOne(walletId);
      const transactionType = createTransactionDto.type;
      const transaction = this.transactionsService.create(createTransactionDto);

      if (transactionType === 'credit') {
        const walletAmout = wallet.balance + (await transaction).amount;
        this.walletService.update(walletId, { balance: walletAmout });
      } else if (transactionType === 'debit') {
        const walletAmout = wallet.balance - (await transaction).amount;
        if (walletAmout < 0) {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'Insufficient balance',
            },
            HttpStatus.FORBIDDEN,
          );
        } else this.walletService.update(walletId, { balance: walletAmout });
      }
      return transaction;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Could not add transaction',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
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
