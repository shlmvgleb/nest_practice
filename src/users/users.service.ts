import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/userDTO";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "../roles/roles.service";
import { log } from "util";
import { BanUserDTO } from "./dto/banUserDTO";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {}

  async createUser(dto: CreateUserDTO) {
    const user = await User.create(dto);
    const role = await this.roleService.getRoleByValue("ADMIN")
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;
  }

  async getAllUsers() {
    const users = await User.findAll({include: {all: true}});
    return users;
  }

  async getUserByEmail(email: string){
    const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
    return user;
  }


  async banUserById(dto: BanUserDTO) {
    console.log(dto.id);
    const user = await User.findByPk(dto.id)
    if(!user) throw new HttpException({message: "Пользователь не найден"}, HttpStatus.BAD_REQUEST)
    user.isBanned = true;
    await user.save()
    return user;
  }
}
