import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskModel } from '@public-api/model';
import type { TaskDto } from '@shared-interface';
import type { IGetOneTaskQuery } from './contract/get-one-task.query.port';
import { toTaskDto } from './task.mapper';

@Injectable()
export class GetOneTaskQuery implements IGetOneTaskQuery {
  constructor(@InjectModel(TaskModel) private readonly taskModel: typeof TaskModel) {}

  async query(id: number): Promise<TaskDto | null> {
    const row = await this.taskModel.findByPk(id);
    return row ? toTaskDto(row) : null;
  }
}
