import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as IPost } from '../common/interfaces/post.interface';
import { Comment as IComment } from '../common/interfaces/comment.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { uuid } from 'uuidv4';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async listPostsWithCommentsCounter(): Promise<IPost[]> {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin(Comment, 'comment', 'comment.blogpost = post.id')
      .select('post.id', 'id')
      .addSelect('post.title', 'title')
      .addSelect('COUNT(comment.id)', 'commentCount')
      .groupBy('post.id')
      .addGroupBy('post.title')
      .getRawMany();

    return posts.map(({ id, title, commentCount }) => ({
      id,
      title,
      commentCount,
    }));
  }

  async createPost(body: CreatePostDto): Promise<Partial<IPost>> {
    const id = uuid();
    const newPost = this.postRepository.create({
      ...body,
      id,
    });

    await this.postRepository.save(newPost);

    return { id };
  }

  async getPostWithCommentsList(postId: string): Promise<IPost | null> {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) return null;

    const comments = await this.commentRepository.find({
      where: { blogpost: { id: postId } },
      select: ['id', 'content'],
    });

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      comments: comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
      })),
    };
  }

  async createPostComment(
    postId: string,
    body: CreateCommentDto,
  ): Promise<Partial<IComment>> {
    const id = uuid();
    const newComment = this.commentRepository.create({
      ...body,
      id,
      blogpost: { id: postId },
    });

    await this.commentRepository.save(newComment);

    return { id };
  }
}
