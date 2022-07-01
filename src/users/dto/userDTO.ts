import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDTO {

  @IsString({message: 'Должно быть строкой'})
  @IsEmail({}, {message: 'Некорректный email'})
  readonly email: string;
  @IsString({message: 'Должно быть строкой'})
  @Length(8, 30, {message: 'Не меньше 8 и не больше 30'})
  readonly password: string;
}
