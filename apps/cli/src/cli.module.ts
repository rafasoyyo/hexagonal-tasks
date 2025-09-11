import { Module } from '@nestjs/common';

import { BasicModule } from './basic/infrastructure/cli/basic.module';

@Module({
  imports: [BasicModule],
  controllers: [],
  providers: [],
})
export class CLIModule {}
