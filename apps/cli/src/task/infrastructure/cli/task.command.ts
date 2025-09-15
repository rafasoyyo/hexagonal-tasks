import { Command, CommandRunner } from 'nest-commander';

import { TaskCreateCommand } from './task.create.command';

@Command({
  name: 'task',
  description: 'Task management commands',
  subCommands: [TaskCreateCommand],
})
export class TaskCommand extends CommandRunner {
  run(): any {
    this.command.outputHelp();
  }
}
