import { IsString } from "class-validator";

export class CreatePostDTO {

  @IsString({message: 'Должно быть строкой'})
  readonly tittle: string;
  @IsString({message: 'Должно быть строкой'})
  readonly content: string;
  userId: number;
}