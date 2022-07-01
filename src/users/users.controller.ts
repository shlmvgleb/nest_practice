import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { BanUserDTO } from "./dto/banUserDTO";
import { BanGuard } from "../auth/ban.guard";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";


@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}


  @UseGuards(JwtAuthGuard, BanGuard)
  @Get()
  getAllUsers(){
    return this.userService.getAllUsers();
  }


  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('ban')
  banUserById(@Body() dto: BanUserDTO){
    return this.userService.banUserById(dto);
}

}
