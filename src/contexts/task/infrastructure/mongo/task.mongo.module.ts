import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Task } from '@task/domain/task';
import { TaskRepository } from '@task/domain/task.repository';
import { TaskMongoRepository } from '@task/infrastructure/mongo/task.mongo.repository';
import { TaskSchema } from '@task/infrastructure/mongo/task.mongo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [
    TaskMongoRepository,
    { provide: TaskRepository, useExisting: TaskMongoRepository },
  ],
  exports: [TaskRepository],
})
export class TaskMongoModule {}
