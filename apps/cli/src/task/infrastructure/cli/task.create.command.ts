import { Logger } from '@nestjs/common';
import { Command as CMD } from 'commander';

import {
  CommandRunner,
  InjectCommander,
  Option,
  SubCommand,
} from 'nest-commander';

import { CustomError } from '@shared/utils/errorHandler';
import { CreateTaskDto } from '@task/application/create/task.create.dto';
import { CreateTaskUseCase } from '@task/application/create/task.create.usecase';

// RUN COMMAND
// npm run start:cli task -- create -t title -d description -s status

// SEE HELP
// npm run start:cli task -- create -h

@SubCommand({
  name: 'create',
  description: 'Create a new task',
})
export class TaskCreateCommand extends CommandRunner {
  constructor(
    @InjectCommander() private readonly cmd: CMD,
    private readonly logService: Logger,
    private readonly createTaskUseCase: CreateTaskUseCase,
  ) {
    super();
    this.logService.log('Create task command initialized');
    this.cmd = cmd;
  }

  async run(passedParam: string[], createTaskDto: CreateTaskDto): Promise<any> {
    this.cmd.exitOverride((err) => {
      this.logService.error('Error message', err);
    });
    this.logService.warn(
      `Create task input params: ${JSON.stringify(passedParam)} ${JSON.stringify(createTaskDto)}`,
    );

    try {
      const newTask = await this.createTaskUseCase.execute(createTaskDto);
      return this.logService.warn(
        `Task created successfully: ${JSON.stringify(newTask)}`,
      );
    } catch (error) {
      CustomError.toCLIResponse(error);
    }
  }

  @Option({
    flags: '-t, --title [string]',
    description: 'Mandatory string to define the task title',
    required: true,
  })
  parseTitle(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --description [string]',
    description: 'Mandatory string to define the task description',
    required: true,
  })
  parseDescription(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --status [string]',
    description: 'Optional string to define the task status',
    required: false,
  })
  parseStatus(val: string): string {
    return val;
  }
}
