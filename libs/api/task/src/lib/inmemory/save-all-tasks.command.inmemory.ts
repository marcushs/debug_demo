import type { TaskDto } from '@shared-interface';
import type { ISaveAllTasksCommand } from '../contract/save-all-tasks.command.port';
import { taskInMemoryStore } from './task.inmemory-store';

export class SaveAllTasksCommandInMemory implements ISaveAllTasksCommand {
  async saveAll(tasks: TaskDto[]): Promise<TaskDto[]> {
    for (const task of tasks) {
      const index = taskInMemoryStore.findIndex(row => row.id === task.id);
      if (index !== -1) {
        taskInMemoryStore[index] = { ...task };
      }
    }
    return [...taskInMemoryStore].sort((a, b) => a.priority - b.priority);
  }
}
