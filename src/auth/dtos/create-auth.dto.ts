import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateAuthDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  picture: string;
}
