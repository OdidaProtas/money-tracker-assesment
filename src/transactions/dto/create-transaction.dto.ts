import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  walletId: string;

  @ApiProperty({ required: false, default: 'credit' })
  type?: string;

  @ApiProperty({
    required: false,
  })
  description?: string;

  @ApiProperty({ default: 0.0 })
  amount?: number = 0.0;
}
