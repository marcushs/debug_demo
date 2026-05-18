import type { TaskDto } from '@shared-interface';
import type { IGetManyTasksQuery } from '../contract/get-many-tasks.query.port';
import { taskInMemoryStore } from './task.inmemory-store';

export class GetManyTasksQueryInMemory implements IGetManyTasksQuery {
  async query(): Promise<TaskDto[]> {
    return [...taskInMemoryStore].sort((a, b) => a.priority - b.priority);
  }
}
