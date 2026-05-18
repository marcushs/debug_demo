import { Module } from '@nestjs/common';
import { CreateOneTaskCommand } from './create-one-task.command';
import type { IGetManyTasksQuery } from './contract/get-many-tasks.query.port';
import type { ISaveAllTasksCommand } from './contract/save-all-tasks.command.port';
import { DeleteOneTaskCommand } from './delete-one-task.command';
import { GetManyTasksQuery } from './get-many-tasks.query';
import { GetOneTaskQuery } from './get-one-task.query';
import { SaveAllTasksCommand } from './save-all-tasks.command';
import { UpdateOneTaskCommand } from './update-one-task.command';
import { UpdateTaskPriorityUC } from './update-task-priority.uc';

@Module({
  providers: [
    GetManyTasksQuery,
    GetOneTaskQuery,
    CreateOneTaskCommand,
    UpdateOneTaskCommand,
    DeleteOneTaskCommand,
    SaveAllTasksCommand,
    {
      provide: UpdateTaskPriorityUC,
      useFactory: (
        getManyTasksQuery: IGetManyTasksQuery,
        saveAllTasksCommand: ISaveAllTasksCommand
      ): UpdateTaskPriorityUC => new UpdateTaskPriorityUC(getManyTasksQuery, saveAllTasksCommand),
      inject: [GetManyTasksQuery, SaveAllTasksCommand]
    }
  ],
  exports: [
    GetManyTasksQuery,
    GetOneTaskQuery,
    CreateOneTaskCommand,
    UpdateOneTaskCommand,
    DeleteOneTaskCommand,
    UpdateTaskPriorityUC
  ]
})
export class TaskModule {}
