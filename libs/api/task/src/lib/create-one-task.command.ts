import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskModel } from '@public-api/model';
import type { CreateTaskInput, TaskDto } from '@shared-interface';
import type { ICreateOneTaskCommand } from './contract/create-one-task.command.port';
import { toTaskDto } from './task.mapper';

@Injectable()
export class CreateOneTaskCommand implements ICreateOneTaskCommand {
  constructor(@InjectModel(TaskModel) private readonly taskModel: typeof TaskModel) {}

  async create(input: CreateTaskInput): Promise<TaskDto> {
    const maxPriority = (await this.taskModel.max('priority')) as number | null;
    const row = await this.taskModel.create({
      title: input.title,
      description: input.description ?? '',
      priority: (maxPriority ?? 0) + 1,
      completed: false
    });
    return toTaskDto(row);
  }
}
