import { Injectable } from '@nestjs/common';

import { Task, TaskResponse } from '../../domain/task';
import { TaskRepository } from '../../domain/task.repository';
import { CreateTaskDto } from './task.create.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskData: CreateTaskDto): Promise<TaskResponse> {
    const task = new Task(taskData);
    const savedTask = await this.taskRepository.create(task);
    return new Task(savedTask.toObject()).toObject();
  }
}
