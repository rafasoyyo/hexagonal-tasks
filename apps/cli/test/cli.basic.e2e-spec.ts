import { TestingModule } from '@nestjs/testing';

import { CommandTestFactory } from 'nest-commander-testing';

import { BasicCommand } from '../src/basic/infrastructure/cli/basic.command';
import { CLIModule } from '../src/cli.module';

describe('Basic CLI commands', () => {
  let commandInstance: TestingModule;
  let basicCommand: BasicCommand;

  beforeAll(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [CLIModule],
    }).compile();

    basicCommand = commandInstance.get(BasicCommand);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a string', async () => {
    const result = (await basicCommand.run(['run'], {
      string: 'echo Hello World!',
    })) as string;

    expect(result).toBe('echo Hello World!');
  });

  it('should run', async () => {
    let error: Error | undefined;
    try {
      const result = await CommandTestFactory.run(commandInstance, [
        'basic',
        '-n',
        '2',
      ]);
      expect(result).toBeUndefined();
    } catch (err) {
      error = err as Error;
    }
    expect(error).toBeUndefined();
  });

  it('should return a number', async () => {
    const result = (await basicCommand.run(['run'], {
      number: 2,
    })) as number;

    expect(result).toBe(2);
  });

  it('should return a boolean', async () => {
    const result = (await basicCommand.run(['run'], {
      boolean: true,
    })) as boolean;

    expect(result).toBe(true);
  });
});
