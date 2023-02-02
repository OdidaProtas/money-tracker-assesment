import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { getBalance } from 'src/wallets/wallets.controller';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id/profile')
  async findProfile(@Param('id') id: string) {
    const user: any = await this.usersService.findProfile(id);
    const balance = user.wallets.reduce((prev, curr) => {
      return prev + getBalance(curr.transactions);
    }, 0);
    const walletSummaries = user.wallets.map((wallet) => ({
      name: wallet.name,
      balance: getBalance(wallet.transactions),
      id: wallet.id,
    }));
    return { ...user, balance, wallets: walletSummaries };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
