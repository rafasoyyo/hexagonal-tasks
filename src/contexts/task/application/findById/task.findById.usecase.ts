import { Injectable } from '@nestjs/common';


import { CustomError, CustomErrorTypes } from '@shared/utils/errorHandler';
import { Task, TaskResponse } from '../../domain/task';
import { TaskRepository } from '../../domain/task.repository';

@Injectable()
export class FindByIdTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<TaskResponse> {
    const foundTask = await this.taskRepository.findById(taskId);

    if (!foundTask) {
      throw new CustomError(CustomErrorTypes.TASK_NOT_FOUND);
    }

    return new Task(foundTask.toObject()).toObject();
  }
}
