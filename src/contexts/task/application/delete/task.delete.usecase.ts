import { Injectable } from '@nestjs/common';

import { TaskRepository } from '../../domain/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    return await this.taskRepository.delete(taskId);
  }
}
