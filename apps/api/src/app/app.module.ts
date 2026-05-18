import { Module } from '@nestjs/common';
import { SequelizeDatabaseModule } from '@public-api/model';
import { TaskModule } from '@public-api/task';
import { TaskController } from './task/task.controller';

@Module({
  imports: [SequelizeDatabaseModule, TaskModule],
  controllers: [TaskController]
})
export class AppModule {}
