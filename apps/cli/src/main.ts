import { ConsoleLogger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';

import { CLIModule } from './cli.module';

async function bootstrap() {
  const logger = new ConsoleLogger({
    logLevels: ['error', 'warn'],
    prefix: 'CLI',
    timestamp: false,
  });

  await CommandFactory.run(CLIModule, logger);
}
bootstrap();
