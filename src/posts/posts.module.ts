import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from "../users/users.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([User, Post]),
    AuthModule]
})
export class PostsModule {}
