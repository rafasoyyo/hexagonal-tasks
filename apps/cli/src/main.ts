import { ConsoleLogger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';

import { CLIModule } from './cli.module';

async function bootstrap() {
  const logger = new ConsoleLogger({
    logLevels: ['error', 'warn'],
    prefix: 'CLI',
    timestamp: false,
  });

  await CommandFactory.runWithoutClosing(CLIModule, {
    logger,
    abortOnError: false,
    cliName: 'rafa',
    errorHandler: (err) => {
      console.error('custom error');
      process.exit(0); // this could also be a 0 depending on how you want to handle the exit code
    },
  });
}
bootstrap();
