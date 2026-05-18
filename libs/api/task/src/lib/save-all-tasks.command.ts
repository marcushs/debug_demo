import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskModel } from '@public-api/model';
import type { TaskDto } from '@shared-interface';
import type { ISaveAllTasksCommand } from './contract/save-all-tasks.command.port';
import { toTaskDto } from './task.mapper';

@Injectable()
export class SaveAllTasksCommand implements ISaveAllTasksCommand {
  constructor(@InjectModel(TaskModel) private readonly taskModel: typeof TaskModel) {}

  async saveAll(tasks: TaskDto[]): Promise<TaskDto[]> {
    const updated: TaskDto[] = [];
    for (const task of tasks) {
      const row = await this.taskModel.findByPk(task.id);
      if (row) {
        await row.update({
          priority: task.priority,
          title: task.title,
          description: task.description,
          completed: task.completed
        });
        updated.push(toTaskDto(row));
      }
    }
    return updated.sort((a, b) => a.priority - b.priority);
  }
}
