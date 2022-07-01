import { Injectable } from '@nestjs/common';
import {CreateRoleDTO} from "./dto/roleDTO";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}


  async createRole(dto: CreateRoleDTO) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(role_name: string) {
    const role = await this.roleRepository.findOne({where: {role_name}})
    return role;
  }

}