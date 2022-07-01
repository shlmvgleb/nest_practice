import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from "./users.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "../roles/roles.model";
import { RolesModule } from "../roles/roles.module";
import { UserRoles } from "../roles/user.roles.model";
import { Post } from "../posts/posts.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
