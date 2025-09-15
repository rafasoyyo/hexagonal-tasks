import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskRepository } from '@task/domain/task.repository';
import { Task } from './task.postgres.entity';
import { TaskPostgresRepository } from './task.postgres.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [
    TaskPostgresRepository,
    { provide: TaskRepository, useExisting: TaskPostgresRepository },
  ],
  exports: [TaskRepository],
})
export class TaskPostgresModule {}
