import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WalletsService } from 'src/wallets/wallets.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, WalletsService],
  imports: [PrismaModule],
})
export class TransactionsModule {}
