import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateAuthDto {

  
  @ApiProperty()
  googleId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  picture: string;
}
