import { Logger, Module } from '@nestjs/common';

import { BasicCommand } from './infrastructure/cli/basic.command';

@Module({
  providers: [Logger, BasicCommand],
})
export class BasicModule {}
