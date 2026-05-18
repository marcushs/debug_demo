import type { TaskDto } from '@shared-interface';

export interface IGetManyTasksQuery {
  query(): Promise<TaskDto[]>;
}
