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
import { CreateTaskDto } from '@task/application/create/task.create.dto';
import { CreateTaskUseCase } from '@task/application/create/task.create.usecase';
import { FindByIdTaskUseCase } from '@task/application/findById/task.findById.usecase';
import { TaskResponse } from '@task/domain/task';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly findByIdTaskUseCase: FindByIdTaskUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
  ) {}

  @ApiOperation({ summary: 'Find a task', tags: ['Tasks'] })
  @ApiResponse({ status: 201, description: 'Found task', type: CreateTaskDto })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Get(':id')
  async getTask(@Param('id') id: string): Promise<TaskResponse> {
    try {
      return await this.findByIdTaskUseCase.execute(id);
    } catch (error) {
      throw CustomError.toHTTPResponse(error);
    }
  }

  @Get()
  getTasksList(): string {
    return 'Hello World';
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

  @Delete()
  deleteTask(): string {
    return 'Hello World';
  }
}
