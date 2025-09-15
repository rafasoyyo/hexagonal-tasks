import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DBModule } from '@shared/modules/db.modules';
import { BasicWebModule } from '../contexts/basic/basic.api.module';
import { TaskWebModule } from '../contexts/task/task.web.module';

@Module({
  imports: [ConfigModule.forRoot(), DBModule, BasicWebModule, TaskWebModule],
  controllers: [],
  providers: [],
})
export class WebModule {}
