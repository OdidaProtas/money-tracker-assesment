import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WalletsModule } from './wallets/wallets.module';
import { UsersModule } from './users/users.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpensesModule } from './expenses/expenses.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [PrismaModule, WalletsModule, UsersModule, IncomesModule, ExpensesModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
