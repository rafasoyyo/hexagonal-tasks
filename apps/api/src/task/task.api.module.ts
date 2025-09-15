import { Module } from '@nestjs/common';

import { TaskModule } from '@task/task.module';

import { TasksController } from './infrastructure/http/task.controller';

@Module({
  imports: [TaskModule],
  controllers: [TasksController],
})
export class TaskAPIModule {}
