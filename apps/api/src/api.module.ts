import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DBModule } from '@shared/modules/db.modules';
import { BasicAPIModule } from './basic/basic.api.module';
import { TaskAPIModule } from './task/task.api.module';

@Module({
  imports: [ConfigModule.forRoot(), DBModule, BasicAPIModule, TaskAPIModule],
})
export class ApiModule {}
