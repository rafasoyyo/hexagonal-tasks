import { Logger } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

// npm run start:cli basic -n 2
// npm start -- cli -- basic -n 2

@Command({ name: 'basic', description: 'A parameter parse' })
export class BasicCommand extends CommandRunner {
  constructor(private readonly logService: Logger) {
    super();
    this.logService.log('Basic command initialized');
  }

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<any> {
    this.logService.warn(
      `Basic command input params: ${JSON.stringify(passedParam)} ${JSON.stringify(options)}`,
    );

    const { boolean, number, string } = options || {};
    this.logService.warn(`Basic output: ${boolean || number || string}`);
    return Promise.resolve(boolean || number || string);
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A basic number parser',
  })
  parseNumber(val: string): number {
    return Number(val);
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --boolean [boolean]',
    description: 'A boolean parser',
  })
  parseBoolean(val: string): boolean {
    return JSON.parse(val) as boolean;
  }
}
