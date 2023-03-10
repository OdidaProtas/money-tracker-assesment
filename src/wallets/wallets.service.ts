import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}
  create(createWalletDto: CreateWalletDto) {
    return this.prisma.wallet.create({ data: createWalletDto });
  }

  findAll() {
    return this.prisma.wallet.findMany({ include: { transactions: true } });
  }

  findOne(id: string) {
    return this.prisma.wallet.findUnique({
      where: { id: String(id) },
      include: { transactions: true },
    });
  }

  update(id: string, updateWalletDto: UpdateWalletDto) {
    return this.prisma.wallet.update({
      where: { id },
      data: updateWalletDto,
    });
  }

  remove(id: string) {
    return this.prisma.wallet.delete({
      where: { id },
    });
  }
}
