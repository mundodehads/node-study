import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post as IPost } from '../common/interfaces/post.interface';
import { NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

const MOCKED_POSTS: IPost[] = [
  {
    id: '0',
    title: 'My first post',
    content: 'This is my first post',
  },
  {
    id: '1',
    title: 'My second post',
    content: 'This is my second post',
  },
];

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            listPostsWithCommentsCounter: jest.fn(),
            createPost: jest.fn(),
            getPostWithCommentsList: jest.fn(),
            createPostComment: jest.fn(),
          },
        },
      ],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  describe('listPosts', () => {
    it('should list all posts available', async () => {
      jest
        .spyOn(postsService, 'listPostsWithCommentsCounter')
        .mockResolvedValue(MOCKED_POSTS);

      const res = await postsController.listPosts();

      expect(res.length).toBe(MOCKED_POSTS.length);
      expect(postsService.listPostsWithCommentsCounter).toHaveBeenCalled();
    });

    it('should still return empty if nothing is found', async () => {
      jest
        .spyOn(postsService, 'listPostsWithCommentsCounter')
        .mockResolvedValue([]);

      const res = await postsController.listPosts();

      expect(res.length).toBe(0);
      expect(postsService.listPostsWithCommentsCounter).toHaveBeenCalled();
    });
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'New Post',
        content: 'New Content',
      };

      const createdUser = { id: '2' };
      jest.spyOn(postsService, 'createPost').mockResolvedValue(createdUser);

      const res = await postsController.createPost(createPostDto);
      expect(res).toEqual(createdUser);
    });
  });

  describe('getPost', () => {
    it('should be able to retrieve a post details', async () => {
      const { id, title, content } = MOCKED_POSTS[0];
      jest
        .spyOn(postsService, 'getPostWithCommentsList')
        .mockResolvedValue({ id, title, content, comments: [] });

      const res = await postsController.getPost(MOCKED_POSTS[0].id || '');
      expect(res).toEqual({
        id: MOCKED_POSTS[0].id,
        title: MOCKED_POSTS[0].title,
        content: MOCKED_POSTS[0].content,
        comments: [],
      });
    });

    it('should return a 404 if a non-existent post is requested', async () => {
      jest
        .spyOn(postsService, 'getPostWithCommentsList')
        .mockResolvedValue(null);

      await expect(postsController.getPost('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createComment', () => {
    it('should create comment for a specific post', async () => {
      const createCommentDto: CreateCommentDto = {
        content: 'New Comment',
      };

      const createdComment = { id: '1' };
      jest
        .spyOn(postsService, 'createPostComment')
        .mockResolvedValue(createdComment);

      const res = await postsController.createComment(
        MOCKED_POSTS[0].id || '',
        createCommentDto,
      );
      expect(res).toEqual(createdComment);
    });
  });
});
