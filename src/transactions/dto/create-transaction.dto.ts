import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  walletId: string;

  @ApiProperty({ default: 'credit' })
  type: string;

  @ApiProperty({
    required: false,
  })
  description?: string;

  @ApiProperty()
  amount: number;
}
