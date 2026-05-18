import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskModel } from '@public-api/model';
import type { TaskDto } from '@shared-interface';
import type { IGetManyTasksQuery } from './contract/get-many-tasks.query.port';
import { toTaskDto } from './task.mapper';

@Injectable()
export class GetManyTasksQuery implements IGetManyTasksQuery {
  constructor(@InjectModel(TaskModel) private readonly taskModel: typeof TaskModel) {}

  async query(): Promise<TaskDto[]> {
    const rows = await this.taskModel.findAll({ order: [['priority', 'ASC']] });
    return rows.map(toTaskDto);
  }
}
