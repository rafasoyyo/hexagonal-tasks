import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CustomError } from '@shared/utils/errorHandler';
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindByIdTaskUseCase,
  FindTasksListUseCase,
} from '@task/application';
import { CreateTaskDto } from '@task/application/create/task.create.dto';
import { TaskResponse } from '@task/domain/task';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly findTasksListUseCase: FindTasksListUseCase,
    private readonly findByIdTaskUseCase: FindByIdTaskUseCase,
  ) {}

  @ApiOperation({ summary: 'Find a task', tags: ['Tasks'] })
  @ApiResponse({ status: 200, description: 'Found task', type: CreateTaskDto })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Get(':id')
  async getTask(@Param('id') id: string): Promise<TaskResponse> {
    try {
      return await this.findByIdTaskUseCase.execute(id);
    } catch (error) {
      throw CustomError.toHTTPResponse(error);
    }
  }

  @ApiOperation({ summary: 'Find all tasks', tags: ['Tasks'] })
  @ApiResponse({
    status: 200,
    description: 'Found tasks',
    type: CreateTaskDto,
    isArray: true,
  })
  @Get()
  async getTasksList(): Promise<TaskResponse[]> {
    try {
      return await this.findTasksListUseCase.execute();
    } catch (error) {
      throw CustomError.toHTTPResponse(error);
    }
  }

  @ApiOperation({ summary: 'Create task', tags: ['Tasks'] })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Create task', type: CreateTaskDto })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Validation/Storage failed.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponse> {
    try {
      return await this.createTaskUseCase.execute(createTaskDto);
    } catch (error) {
      throw CustomError.toHTTPResponse(error);
    }
  }

  @Put()
  updateTask(): string {
    return 'Hello World';
  }

  @ApiOperation({ summary: 'Delete a tasks', tags: ['Tasks'] })
  @ApiResponse({ status: 200, description: 'Deleted task' })
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    try {
      return await this.deleteTaskUseCase.execute(id);
    } catch (error) {
      throw CustomError.toHTTPResponse(error);
    }
  }
}
