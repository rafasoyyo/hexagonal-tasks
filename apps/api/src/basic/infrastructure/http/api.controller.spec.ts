import { Test, TestingModule } from '@nestjs/testing';

import { ApiService } from '../../application/api.service';
import { ApiController } from './api.controller';

describe('AppController', () => {
  let appController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService],
    }).compile();

    appController = app.get<ApiController>(ApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World API!');
    });
  });
});
