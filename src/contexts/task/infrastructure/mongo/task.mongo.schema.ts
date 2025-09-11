import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { TaskStatus } from '../../domain/task';

export type TaskDocument = HydratedDocument<TaskModel>;

@Schema({ timestamps: true })
export class TaskModel {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    type: String,
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;

  @Prop()
  updatedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
TaskSchema.index({ status: 1 });
