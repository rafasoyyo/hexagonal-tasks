import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateTaskDto } from '@task/application/create/task.create.dto';
import { CreateTaskUseCase } from '@task/application/create/task.create.usecase';
import { TaskResponse } from '@task/domain/task';

@Controller('tasks')
export class TasksController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Get(':id')
  getTask(@Param('id') id: string): string {
    return `Hello World ${id}`;
  }

  @Get()
  getTasksList(): string {
    return 'Hello World';
  }

  @ApiOperation({ summary: 'Create task', tags: ['Tasks'] })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Create task', type: CreateTaskDto })
  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponse> {
    try {
      return await this.createTaskUseCase.execute(createTaskDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(String(error), HttpStatus.BAD_REQUEST);
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
