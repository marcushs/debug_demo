import { Injectable, NotFoundException } from '@nestjs/common';
import type { TaskDto } from '@shared-interface';
import type { IGetManyTasksQuery } from './contract/get-many-tasks.query.port';
import type { ISaveAllTasksCommand } from './contract/save-all-tasks.command.port';
import type { IUpdateTaskPriorityUC } from './contract/update-task-priority.uc.port';

/**
 * Workshop bug: priorities are renumbered with 0-based indices (0, 1, 2…)
 * instead of 1-based (1, 2, 3…), which breaks ordering after a move.
 */
@Injectable()
export class UpdateTaskPriorityUC implements IUpdateTaskPriorityUC {
  constructor(
    private readonly getManyTasksQuery: IGetManyTasksQuery,
    private readonly saveAllTasksCommand: ISaveAllTasksCommand
  ) {}

  async handle(id: number, priority: number): Promise<TaskDto[]> {
    const tasks = await this.getManyTasksQuery.query();
    const movedIndex = tasks.findIndex(task => task.id === id);
    if (movedIndex === -1) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    const oldPriority = tasks[movedIndex].priority;
    const movingDown = priority > oldPriority;

    const working = tasks.map(task => ({ ...task }));
    working[movedIndex].priority = priority;
    working.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      if (a.id === id) return movingDown ? 1 : -1;
      if (b.id === id) return movingDown ? -1 : 1;
      return 0;
    });

    for (let i = 0; i < working.length; i++) {
      for (let j = i + 1; j < working.length; j++) {
        if (working[i].priority === working[j].priority && working[i].id !== working[j].id) {
          working[j].priority = working[j].priority + 1;
        }
      }
    }

    working.sort((a, b) => a.priority - b.priority);

    for (let i = 0; i < working.length; i++) {
      working[i].priority = i;
    }

    return this.saveAllTasksCommand.saveAll(working);
  }
}
