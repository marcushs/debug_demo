import type { TaskDto } from '@shared-interface';

export interface IUpdateTaskPriorityUC {
  handle(id: number, priority: number): Promise<TaskDto[]>;
}
