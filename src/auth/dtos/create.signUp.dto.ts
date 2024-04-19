import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class SignUp {

  @MaxLength(30)
  @IsOptional()
  firstName?: string = undefined;

  @MaxLength(30)
  @IsOptional()
  lastName?: string = undefined;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  password: string;

}

