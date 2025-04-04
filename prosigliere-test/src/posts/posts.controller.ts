import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Request,
  ForbiddenException,
  Param,
  Put,
  Body,
  Delete,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Post as IPost } from '../common/interfaces/post.interface';
import { Comment as IComment } from '../common/interfaces/comment.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ReturningStatementNotSupportedError } from 'typeorm';

@ApiTags('posts')
@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('posts')
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server han an error',
  })
  async listPosts(): Promise<IPost[]> {
    return this.postsService.listPostsWithCommentsCounter();
  }

  @Post('posts')
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server han an error',
  })
  async createPost(@Body() body: CreatePostDto): Promise<Partial<IPost>> {
    const { id } = await this.postsService.createPost(body);
    return { id };
  }

  @Get('posts/:postId')
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found!',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server han an error',
  })
  async getPost(@Param('postId') postId: string): Promise<IPost | null> {
    const post = await this.postsService.getPostWithCommentsList(postId);
    if (!post) throw new NotFoundException('Post not found!');

    return post;
  }

  @Post('posts/:postId/comments')
  @HttpCode(200)
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok!' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server han an error',
  })
  async createComment(
    @Param('postId') postId: string,
    @Body() body: CreateCommentDto,
  ): Promise<Partial<IComment>> {
    const { id } = await this.postsService.createPostComment(postId, body);
    return { id };
  }
}
