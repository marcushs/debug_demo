import type { TaskDto } from '@shared-interface';

export interface ISaveAllTasksCommand {
  saveAll(tasks: TaskDto[]): Promise<TaskDto[]>;
}
