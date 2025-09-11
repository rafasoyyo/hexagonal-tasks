import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateTaskUseCase } from '@task/application/create/task.create.usecase';
import { Task } from '@task/domain/task';
import { TaskRepository } from '@task/domain/task.repository';
import { TaskMongoRepository } from '@task/infrastructure/mongo/task.mongo.repository';
import { TaskSchema } from '@task/infrastructure/mongo/task.mongo.schema';

import { TasksController } from './infrastructure/http/task.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [
    Logger,
    CreateTaskUseCase,
    TaskMongoRepository,
    { provide: TaskRepository, useExisting: TaskMongoRepository },
  ],
  exports: [CreateTaskUseCase],
})
export class TaskModule {}
