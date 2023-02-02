import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('wallets')
@ApiTags('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  async findAll() {
    const wallets = await this.walletsService.findAll();
    return wallets.map((wallet: any) => {
      let _wallet = { ...wallet, balance: getBalance(wallet.transactions) };
      delete _wallet['transactions'];
      return _wallet;
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wallet = await this.walletsService.findOne(id);
    const balance = getBalance(wallet.transactions);
    const withBalance = { ...wallet, balance };
    return withBalance;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(id);
  }
}

export function getBalance(transactions = []) {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === 'credit') return acc + transaction.amount;
    return acc - transaction.amount;
  }, 0);
}
