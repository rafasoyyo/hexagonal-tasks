import { Logger, Module } from '@nestjs/common';

import { BasicCommand } from './basic.command';

@Module({
  providers: [Logger, BasicCommand],
})
export class BasicModule {}
