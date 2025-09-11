import { Test, TestingModule } from '@nestjs/testing';

import { BasicService } from '../../application/basic.service';
import { ApiController } from './basic.controller';

describe('AppController', () => {
  let appController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [BasicService],
    }).compile();

    appController = app.get<ApiController>(ApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World API!');
    });
  });
});
