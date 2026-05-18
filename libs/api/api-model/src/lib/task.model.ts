import { Column, DataType, Model, Table } from 'sequelize-typescript';
import type { TaskDto } from '@shared-interface';

@Table({ tableName: 'tasks', timestamps: true })
export class TaskModel extends Model implements TaskDto {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  declare description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare priority: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare completed: boolean;
}
