import { IsNumber } from "class-validator";

export class BanUserDTO {
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly id:number
}
