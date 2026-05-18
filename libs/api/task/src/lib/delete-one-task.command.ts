import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskModel } from '@public-api/model';
import type { IDeleteOneTaskCommand } from './contract/delete-one-task.command.port';

@Injectable()
export class DeleteOneTaskCommand implements IDeleteOneTaskCommand {
  constructor(@InjectModel(TaskModel) private readonly taskModel: typeof TaskModel) {}

  async delete(id: number): Promise<boolean> {
    const affected = await this.taskModel.destroy({ where: { id } });
    return affected > 0;
  }
}
