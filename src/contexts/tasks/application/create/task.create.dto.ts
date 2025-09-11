import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { TaskStatus } from '../../domain/task';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Prop({ type: String })
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Prop({ type: String })
  description: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.PENDING })
  @IsOptional()
  @IsString()
  @Prop({ type: String, default: TaskStatus.PENDING })
  status: TaskStatus = TaskStatus.PENDING;
}
