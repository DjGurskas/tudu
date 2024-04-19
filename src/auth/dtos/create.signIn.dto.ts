import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class SignIn {

    @IsNotEmpty()
    @ApiProperty()
    email: string;
  
    @IsNotEmpty()
    @MaxLength(128)
    @ApiProperty()
    password: string;
  }