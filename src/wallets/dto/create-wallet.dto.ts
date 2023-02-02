// src/articles/dto/create-article.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty({ required: false })
  balance?: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;
}
