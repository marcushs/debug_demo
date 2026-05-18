import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskModel } from '@public-api/model';
import type { TaskDto, UpdateTaskInput } from '@shared-interface';
import type { IUpdateOneTaskCommand } from './contract/update-one-task.command.port';
import { toTaskDto } from './task.mapper';

@Injectable()
export class UpdateOneTaskCommand implements IUpdateOneTaskCommand {
  constructor(@InjectModel(TaskModel) private readonly taskModel: typeof TaskModel) {}

  async update(id: number, input: UpdateTaskInput): Promise<TaskDto | null> {
    const row = await this.taskModel.findByPk(id);
    if (!row) {
      return null;
    }
    await row.update({
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.completed !== undefined ? { completed: input.completed } : {})
    });
    return toTaskDto(row);
  }
}
