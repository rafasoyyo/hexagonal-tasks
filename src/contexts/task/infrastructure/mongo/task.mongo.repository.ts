import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CustomError, CustomErrorTypes } from '@shared/utils/errorHandler';
import { Task } from '../../domain/task';
import { TaskRepository } from '../../domain/task.repository';
import { TaskDocument } from './task.mongo.schema';

@Injectable()
export class TaskMongoRepository implements TaskRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(task: Task): Promise<Task> {
    const savedTaskDoc = await this.taskModel.create(task);
    const savedTask = savedTaskDoc.toObject();
    return new Task({
      id: savedTask._id.toString(),
      title: savedTask.title,
      description: savedTask.description,
      status: savedTask.status,
      createdAt: savedTask.createdAt,
      updatedAt: savedTask.updatedAt,
    });
  }

  async update(task: Task): Promise<Task | null> {
    const updatedTaskDoc = await this.taskModel.findByIdAndUpdate(
      task.id,
      task,
      {
        new: true,
      },
    );

    return updatedTaskDoc
      ? new Task({
          id: updatedTaskDoc._id.toString(),
          title: updatedTaskDoc.title,
          description: updatedTaskDoc.description,
          status: updatedTaskDoc.status,
          createdAt: updatedTaskDoc.createdAt,
          updatedAt: updatedTaskDoc.updatedAt,
        })
      : null;
  }

  async delete(taskId: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(taskId);
  }

  async findById(taskId: string): Promise<Task | null> {
    if (!mongoose.isValidObjectId(taskId)) {
      throw new CustomError(CustomErrorTypes.INVALID_ID);
    }

    const foundTaskDoc = await this.taskModel.findById(taskId);

    return foundTaskDoc
      ? new Task({
          id: foundTaskDoc._id.toString(),
          title: foundTaskDoc.title,
          description: foundTaskDoc.description,
          status: foundTaskDoc.status,
          createdAt: foundTaskDoc.createdAt,
          updatedAt: foundTaskDoc.updatedAt,
        })
      : null;
  }

  async findAll(): Promise<Task[]> {
    const tasksDocs = await this.taskModel.find().exec();
    return tasksDocs.map((taskDoc) => {
      return new Task({
        id: taskDoc._id.toString(),
        title: taskDoc.title,
        description: taskDoc.description,
        status: taskDoc.status,
        createdAt: taskDoc.createdAt,
        updatedAt: taskDoc.updatedAt,
      });
    });
  }
}
