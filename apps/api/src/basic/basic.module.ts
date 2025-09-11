import { Logger, Module } from '@nestjs/common';

import { BasicService } from './application/basic.service';
import { BasicController } from './infrastructure/http/basic.controller';

@Module({
  imports: [],
  controllers: [BasicController],
  providers: [Logger, BasicService],
  exports: [],
})
export class BasicModule {}
