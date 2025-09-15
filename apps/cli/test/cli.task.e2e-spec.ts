import { TestingModule } from '@nestjs/testing';

import { CommandTestFactory } from 'nest-commander-testing';

import { CLIModule } from '../src/cli.module';
import { TaskCommand } from '../src/task/infrastructure/cli/task.command';

describe('Task CLI command', () => {
  let commandInstance: TestingModule;
  let taskCommand: TaskCommand;

  beforeAll(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [CLIModule],
    }).compile();

    taskCommand = commandInstance.get(TaskCommand);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Task create', () => {
    it('should fail', async () => {
      // throw new Error('TEst error');
      let error: Error | undefined;
      try {
        const result = await CommandTestFactory.run(commandInstance, [
          'task',
          'create',
        ]);
        expect(result).toBeUndefined();
      } catch (err) {
        error = err as Error;
      }
      expect(error).toBeUndefined();
    });

    it('should run', async () => {
      let error: Error | undefined;
      try {
        const result = await CommandTestFactory.run(commandInstance, [
          'task',
          'create',
          '-t',
          `test title ${Date.now()}`,
          '-d',
          `test description`,
        ]);
        expect(result).toBeUndefined();
      } catch (err) {
        error = err as Error;
      }
      expect(error).toBeUndefined();
    });
  });
});
