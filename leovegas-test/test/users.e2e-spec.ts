import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Admin user behavior', () => {
    const payload = {
      email: 'new1@email.com',
      password: 'newpass1',
      name: 'New 01',
      role: 'ADMIN',
      id: '2',
    };
    it('/user (POST)', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send(payload)
        .expect(200)
        .expect({ accessToken: 'ADMIN' });
    });

    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'Bearer ADMIN')
        .expect(200)
        .expect((res) => res.statusCode === 200 && res.body.length === 2);
    });

    it('/user/:userId (GET)', () => {
      return request(app.getHttpServer())
        .get(`/user/${payload.id}`)
        .set('Authorization', 'Bearer ADMIN')
        .expect(200)
        .expect({
          email: payload.email,
          name: payload.name,
          role: payload.role,
        });
    });

    it('/user/:userId (PUT)', () => {
      return request(app.getHttpServer())
        .put(`/user/${payload.id}`)
        .send({
          email: 'new2@email.com',
          name: 'New 02',
        })
        .set('Authorization', 'Bearer ADMIN')
        .expect(204)
        .expect({});
    });

    it('/user/:userId (DELETE)', () => {
      return request(app.getHttpServer())
        .delete(`/user/${payload.id}`)
        .set('Authorization', 'Bearer ADMIN')
        .expect(403)
        .expect({ message: 'Forbidden', statusCode: 403 });
    });
  });

  describe('User behavior', () => {
    const payload = {
      email: 'newuser1@email.com',
      password: 'newuserpass1',
      name: 'New User 01',
      role: 'USER',
      id: '3',
    };
    it('/user (POST)', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send(payload)
        .expect(200)
        .expect({ accessToken: 'USER' });
    });

    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'Bearer USER')
        .expect(403)
        .expect({ message: 'Forbidden', statusCode: 403 });
    });

    it('/user/:userId (GET)', () => {
      return request(app.getHttpServer())
        .get(`/user/${payload.id}`)
        .set('Authorization', 'Bearer USER')
        .expect(200)
        .expect({ email: payload.email, name: payload.name });
    });

    it('/user/:userId (PUT)', () => {
      return request(app.getHttpServer())
        .put(`/user/${payload.id}`)
        .send({
          email: 'newuser2@email.com',
          name: 'New User 02',
        })
        .set('Authorization', 'Bearer USER')
        .expect(204)
        .expect({});
    });

    it('/user/:userId (DELETE)', () => {
      return request(app.getHttpServer())
        .delete(`/user/${payload.id}`)
        .set('Authorization', 'Bearer USER')
        .expect(403)
        .expect({ message: 'Forbidden', statusCode: 403 });
    });
  });
});
