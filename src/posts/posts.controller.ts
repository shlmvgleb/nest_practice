import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDTO } from "./dto/postDTO";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { Request } from "express";
import { BanGuard } from "../auth/ban.guard";
import { FileInterceptor } from "@nestjs/platform-express";


@UseGuards(JwtAuthGuard, BanGuard)
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}


  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Req() request: Request, @Body() postDto: CreatePostDTO,
             @UploadedFile() image) {
    return this.postService.createPost(postDto, request, image);
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
