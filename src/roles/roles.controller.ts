import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDTO} from "./dto/roleDTO";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { ValidationPipe } from "../pipes/validation.pipe";


@Roles("ADMIN")
@UseGuards(RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateRoleDTO) {
    return this.roleService.createRole(dto);
  }

  @Get('/:role')
  getByRoleName(@Param('role') roleName: string) {
    return this.roleService.getRoleByValue(roleName);
  }
}
