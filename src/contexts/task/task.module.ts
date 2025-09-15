import { Global, Logger, Module } from '@nestjs/common';

import { ConditionalModule } from '@nestjs/config';
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindByIdTaskUseCase,
  FindTasksListUseCase,
} from '@task/application';
import { TaskMongoModule } from './infrastructure/mongo/task.mongo.module';
import { TaskPostgresModule } from './infrastructure/postgress/task.postgres.module';

@Global()
@Module({
  imports: [
    ConditionalModule.registerWhen(
      TaskMongoModule,
      (env: NodeJS.ProcessEnv) => !!env['MONGO_URI'],
    ),
    ConditionalModule.registerWhen(
      TaskPostgresModule,
      (env: NodeJS.ProcessEnv) => !!env['POSTGRES_URI'],
    ),
  ],
  providers: [
    Logger,
    CreateTaskUseCase,
    DeleteTaskUseCase,
    FindByIdTaskUseCase,
    FindTasksListUseCase,
  ],
  exports: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    FindByIdTaskUseCase,
    FindTasksListUseCase,
  ],
})
export class TaskModule {}
