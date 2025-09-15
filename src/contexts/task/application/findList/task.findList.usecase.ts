import { Injectable } from '@nestjs/common';

import { Task, TaskResponse } from '../../domain/task';
import { TaskRepository } from '../../domain/task.repository';

@Injectable()
export class FindTasksListUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<TaskResponse[]> {
    const foundTasks = await this.taskRepository.findAll();
    return foundTasks.map((f) => new Task(f).toObject());
  }
}
