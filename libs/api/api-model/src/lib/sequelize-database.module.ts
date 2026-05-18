import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { TaskModel } from './task.model';

@Global()
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: join(process.cwd(), 'data', 'workshop.sqlite'),
      models: [TaskModel],
      autoLoadModels: true,
      synchronize: true,
      logging: false
    }),
    SequelizeModule.forFeature([TaskModel])
  ],
  exports: [SequelizeModule]
})
export class SequelizeDatabaseModule {}
