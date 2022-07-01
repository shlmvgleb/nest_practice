import { CanActivate, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { CreatePostDTO } from "./dto/postDTO";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/users.model";

@Injectable()
export class PostsService{
  constructor(@InjectModel(Post) private postRepository: typeof Post,
              private jwtService: JwtService) {}

  async createPost(dto: CreatePostDTO, request: Request){
    const auth = request.headers.authorization.split(' ');
    const token = auth[1];
    const user = this.jwtService.verify(token);
    dto.userId = user.id;
    const post = await Post.create(dto)
    return post;
  }

  async getAllPosts() {
    const posts = await Post.findAll();
    return posts;
  }

  async getUserPosts(req: Request) {
    const auth = req.headers.authorization.split(' ');
    const token = auth[1];
    const user = this.jwtService.verify(token);
    const userEntity = await User.findOne({where: {id: user.id}, include: {all: true} });
    return userEntity.posts;
  }


}
