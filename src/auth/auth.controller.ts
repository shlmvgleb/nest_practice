import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDTO } from "../users/dto/userDTO";
import { AuthService } from "./auth.service";
import { BanGuard } from "./ban.guard";
import { ValidationPipe } from "../pipes/validation.pipe";


@UseGuards(BanGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/login')
  login(@Body() userDto: CreateUserDTO){
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDTO){
    return this.authService.registration(userDto);
  }
}
