import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDTO } from "./dto/postDTO";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { Request } from "express";
import { BanGuard } from "../auth/ban.guard";


@UseGuards(JwtAuthGuard, BanGuard)
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post('/create')
  createPost(@Req() request: Request, @Body() postDto: CreatePostDTO) {
    return this.postService.createPost(postDto, request);
  }


  @Get()
  getAllPosts(){
    return this.postService.getAllPosts();
  }


  @Get('my_articles')
  getUserPosts(@Req() request: Request){
    return this.postService.getUserPosts(request);
  }
}
