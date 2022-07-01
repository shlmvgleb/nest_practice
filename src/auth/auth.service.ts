import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO } from "../users/dto/userDTO";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"
import { User } from "../users/users.model";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async registration(userDto: CreateUserDTO) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if(candidate) {
      throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({...userDto, password: hashPassword});
    return this.generateToken(user)
  }

  async login(userDto: CreateUserDTO) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }


  private generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles, isBanned: user.isBanned};
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDTO) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if(user && passwordEquals){
      return user;
    }
    throw new UnauthorizedException({message: "Некорректная почта или пароль"})
  }
}
