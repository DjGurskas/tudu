import { PartialType } from "@nestjs/swagger";
import { UserDTO } from "./create.google.dto";


export class UpdateGoogleDTO extends PartialType(UserDTO) {}