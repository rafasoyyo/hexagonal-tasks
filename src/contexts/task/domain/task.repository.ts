import { Task } from './task';

export abstract class TaskRepository {
  abstract create(task: Task): Promise<Task>;
  abstract update(task: Task): Promise<Task | null>;
  abstract delete(taskId: string): Promise<void>;
  abstract findById(taskId: string): Promise<Task | null>;
  abstract findAll(): Promise<Task[]>;
}
