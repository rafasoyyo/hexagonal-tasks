/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { App } from 'supertest/types';
import { ApiModule } from '../src/api.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/:id (GET)', () => {
    it('Invalid ID', () => {
      return request(app.getHttpServer())
        .get('/tasks/1')
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            statusCode: 400,
            message: 'Invalid ID',
          });
        });
    });

    it('ID not found', () => {
      return request(app.getHttpServer())
        .get('/tasks/537eed02ed345b2e039652d2')
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({
            statusCode: 404,
            message: 'Task not found',
          });
        });
    });
  });

  describe('/ (POST)', () => {
    it('Invalid body should return an error', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            statusCode: 400,
            message:
              'Task validation failed: title: Path `title` is required., description: Path `description` is required.',
          });
        });
    });

    it('Valid request should return the task', () => {
      const title = `Test task. ${Date.now()}`;
      return (
        request(app.getHttpServer())
          .post('/tasks')
          .send({
            title,
            description: 'Test description',
          })
          // .expect(201)
          .expect((res) => {
            expect(res.body).toMatchObject({
              id: expect.any(String),
              title: title,
              description: 'Test description',
              status: 'pending',
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            });
          })
      );
    });
  });
});
