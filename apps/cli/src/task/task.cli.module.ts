import { Module } from '@nestjs/common';

import { TaskModule } from '@task/task.module';
import { TaskCommand } from './infrastructure/cli/task.command';

@Module({
  imports: [TaskModule],
  providers: [...TaskCommand.registerWithSubCommands()],
})
export class TasksModule {}
