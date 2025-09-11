import { Injectable } from '@nestjs/common';

import mongoose from 'mongoose';

import { CustomError, CustomErrorTypes } from '@shared/utils/errorHandler';
import { Task, TaskResponse } from '../../domain/task';
import { TaskRepository } from '../../domain/task.repository';

@Injectable()
export class FindByIdTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<TaskResponse> {
    if (!mongoose.isValidObjectId(taskId)) {
      throw new CustomError(CustomErrorTypes.INVALID_ID);
    }

    const foundTask = await this.taskRepository.findById(taskId);

    if (!foundTask) {
      throw new CustomError(CustomErrorTypes.TASK_NOT_FOUND);
    }

    return new Task(foundTask.toObject()).toObject();
  }
}
