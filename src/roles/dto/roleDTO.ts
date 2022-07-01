import { IsNumber, IsString } from "class-validator";

export class CreateRoleDTO {

  @IsString({message: 'Должно быть строкой'})
  readonly role_name: string;
  @IsString({message: 'Должно быть строкой'})
  readonly description: string;
}
