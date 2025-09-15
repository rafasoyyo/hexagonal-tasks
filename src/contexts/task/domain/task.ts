import { Types } from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  DELAYED = 'delayed',
}

export interface TaskPrimitives {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskResponse extends TaskPrimitives {
  customId?: string;
}

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;

  defaultStatus: TaskStatus = TaskStatus.PENDING;

  constructor(properties: TaskPrimitives & { _id?: Types.ObjectId }) {
    const id = properties.id || properties._id?.toString();
    if (id) {
      this.id = id;
    }
    this.title = properties.title;
    this.description = properties.description;
    this.status = properties.status || this.defaultStatus;
    this.createdAt = properties.createdAt;
    this.updatedAt = properties.updatedAt;
  }

  toObject(): TaskResponse {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
