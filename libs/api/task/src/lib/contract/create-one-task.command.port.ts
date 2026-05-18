import type { CreateTaskInput, TaskDto } from '@shared-interface';

export interface ICreateOneTaskCommand {
  create(input: CreateTaskInput): Promise<TaskDto>;
}
