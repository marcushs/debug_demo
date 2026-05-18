import type { TaskDto } from '@shared-interface';

export interface IGetOneTaskQuery {
  query(id: number): Promise<TaskDto | null>;
}
