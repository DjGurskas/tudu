import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UUID } from 'crypto';

export class UserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'John', required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'fD6jO@example.com', required: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'https://example.com' })
  picture: string;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  updated_at: Date;
}
