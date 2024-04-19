import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserDetails {
    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;
  }