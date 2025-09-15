import { Module } from '@nestjs/common';

import { BasicController } from './infrastructure/controller/basic.controller';

@Module({
  imports: [],
  controllers: [BasicController],
  providers: [],
  exports: [],
})
export class BasicWebModule {}
