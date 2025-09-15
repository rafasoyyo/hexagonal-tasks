import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';

import { CustomError } from '@shared/utils/errorHandler';
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindByIdTaskUseCase,
  FindTasksListUseCase,
} from '@task/application';
import { CreateTaskDto } from '@task/application/create/task.create.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly findTasksListUseCase: FindTasksListUseCase,
    private readonly findByIdTaskUseCase: FindByIdTaskUseCase,
  ) {}

  @Render('./pages/tasks/listTasks.page.pug')
  @Get(':id')
  async getTask(@Param('id') id: string) {
    try {
      const result = {
        pageTitle: 'Tasks List',
        tasks: await Promise.all([this.findByIdTaskUseCase.execute(id)]),
      };
      return result;
      return await this.findByIdTaskUseCase.execute(id);
    } catch (error) {
      throw CustomError.toHTTPResponse(error);
    }
  }

  @Render('./pages/tasks/listTasks.page.pug')
  @Get()
  async getTasksList() {
    try {
      return {
        pageTitle: 'Tasks List',
        tasks: await this.findTasksListUseCase.execute(),
      };
    } catch (error) {
      throw CustomError.toHTTPResponse(error);
    }
  }

  @Render('./pages/tasks/listTasks.page.pug')
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      await this.createTaskUseCase.execute(createTaskDto);
      return {
        pageTitle: 'Tasks List',
        tasks: await this.findTasksListUseCase.execute(),
      };
    } catch (error) {
      throw CustomError.toHTTPResponse(error);
    }
  }

  @Put()
  updateTask(): string {
    return 'Hello World';
  }

  @Render('./pages/tasks/listTasks.page.pug')
  @Post(':id/delete')
  async deleteTask(@Param('id') id: string) {
    try {
      await this.deleteTaskUseCase.execute(id);
      return {
        pageTitle: 'Tasks List',
        tasks: await this.findTasksListUseCase.execute(),
      };
    } catch (error) {
      throw CustomError.toHTTPResponse(error);
    }
  }
}
