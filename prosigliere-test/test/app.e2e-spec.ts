import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PostsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Lifecycle of a blog post', () => {
    const post_payload = {
      title: 'My blog post',
      content: 'This is my blog post',
    };
    const comment_payload = {
      content: 'This is my comment',
    };

    let lifecycle_postId: string;
    let lifecycle_commentId: string;

    it('/api/posts (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/posts')
        .send(post_payload)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body.id).toBe('string');

      lifecycle_postId = response.body.id;

      return response;
    });

    it('/api/posts (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts')
        .expect(200);

      const post = response.body.find(
        (post: any) => post.id === lifecycle_postId,
      );

      expect(post).toBeDefined();
      expect(post.title).toBe(post_payload.title);
      expect(parseInt(post.commentCount)).toBe(0);

      return response;
    });

    it('/api/posts/:postId (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts/' + lifecycle_postId)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.title).toBe(post_payload.title);
      expect(response.body.content).toBe(post_payload.content);
      expect(response.body.comments.length).toBe(0);

      return response;
    });

    it('/api/posts/:postId/comments (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post(`/posts/${lifecycle_postId}/comments`)
        .send(comment_payload)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body.id).toBe('string');

      lifecycle_commentId = response.body.id;

      return response;
    });

    it('/api/posts (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts')
        .expect(200);

      const post = response.body.find(
        (post: any) => post.id === lifecycle_postId,
      );

      expect(parseInt(post.commentCount)).toBe(1);

      return response;
    });

    it('/api/posts/:postId (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts/' + lifecycle_postId)
        .expect(200);

      expect(response.body.comments.length).toBe(1);
      expect(response.body.comments[0].id).toBe(lifecycle_commentId);
      expect(response.body.comments[0].content).toBe(comment_payload.content);

      return response;
    });
  });
});
