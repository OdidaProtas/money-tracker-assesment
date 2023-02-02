import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}
  create(createWalletDto: CreateWalletDto) {
    return this.prisma.wallet.create(createWalletDto);
  }

  findAll() {
    return this.prisma.wallet.findMany();
  }

  findOne(id: string) {
    return this.prisma.wallet.findUnique({
      where: { id },
    });
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
