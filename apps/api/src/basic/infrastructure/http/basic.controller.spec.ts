import { Test, TestingModule } from '@nestjs/testing';

import { BasicService } from '../../application/basic.service';
import { BasicController } from './basic.controller';

describe('BasicController', () => {
  let basicController: BasicController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BasicController],
      providers: [BasicService],
    }).compile();

    basicController = app.get<BasicController>(BasicController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(basicController.getHello()).toBe('Hello World API!');
    });
  });
});
