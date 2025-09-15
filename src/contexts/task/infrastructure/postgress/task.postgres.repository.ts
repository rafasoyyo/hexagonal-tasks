import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../domain/task';
import { TaskRepository } from '../../domain/task.repository';

@Injectable()
export class TaskPostgresRepository implements TaskRepository {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(task: Task): Promise<Task> {
    const savedTask = await this.taskRepository.save(task);
    return new Task({
      id: savedTask.id,
      title: savedTask.title,
      description: savedTask.description,
      status: savedTask.status,
      createdAt: savedTask.createdAt,
      updatedAt: savedTask.updatedAt,
    });
  }

  async update(task: Task): Promise<Task | null> {
    const updatedTaskDoc = await this.taskRepository.save(task);

    return updatedTaskDoc
      ? new Task({
          id: updatedTaskDoc.id,
          title: updatedTaskDoc.title,
          description: updatedTaskDoc.description,
          status: updatedTaskDoc.status,
          createdAt: updatedTaskDoc.createdAt,
          updatedAt: updatedTaskDoc.updatedAt,
        })
      : null;
  }

  async delete(taskId: string): Promise<void> {
    await this.taskRepository.delete({ id: taskId });
  }

  async findById(taskId: string): Promise<Task | null> {
    const foundTaskDoc = await this.taskRepository.findOneBy({ id: taskId });

    return foundTaskDoc
      ? new Task({
          id: foundTaskDoc.id,
          title: foundTaskDoc.title,
          description: foundTaskDoc.description,
          status: foundTaskDoc.status,
          createdAt: foundTaskDoc.createdAt,
          updatedAt: foundTaskDoc.updatedAt,
        })
      : null;
  }

  async findAll(): Promise<Task[]> {
    const tasksDocs = await this.taskRepository.find();
    return tasksDocs.map((taskDoc) => {
      return new Task({
        id: taskDoc.id,
        title: taskDoc.title,
        description: taskDoc.description,
        status: taskDoc.status,
        createdAt: taskDoc.createdAt,
        updatedAt: taskDoc.updatedAt,
      });
    });
  }
}
