import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { CreateOneTaskCommand } from '@public-api/task';
import { DeleteOneTaskCommand } from '@public-api/task';
import { GetManyTasksQuery } from '@public-api/task';
import { GetOneTaskQuery } from '@public-api/task';
import { UpdateOneTaskCommand } from '@public-api/task';
import { UpdateTaskPriorityUC } from '@public-api/task';
import type {
  CreateTaskInput,
  TaskDto,
  UpdateTaskInput,
  UpdateTaskPriorityInput
} from '@shared-interface';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly getManyTasksQuery: GetManyTasksQuery,
    private readonly getOneTaskQuery: GetOneTaskQuery,
    private readonly createOneTaskCommand: CreateOneTaskCommand,
    private readonly updateOneTaskCommand: UpdateOneTaskCommand,
    private readonly deleteOneTaskCommand: DeleteOneTaskCommand,
    private readonly updateTaskPriorityUC: UpdateTaskPriorityUC
  ) {}

  @Get()
  getMany(): Promise<TaskDto[]> {
    return this.getManyTasksQuery.query();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    const task = await this.getOneTaskQuery.query(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  @Post()
  create(@Body() input: CreateTaskInput): Promise<TaskDto> {
    return this.createOneTaskCommand.create(input);
  }

  @Put(':id/priority')
  updatePriority(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateTaskPriorityInput
  ): Promise<TaskDto[]> {
    return this.updateTaskPriorityUC.handle(id, input.priority);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateTaskInput
  ): Promise<TaskDto> {
    const task = await this.updateOneTaskCommand.update(id, input);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ deleted: boolean }> {
    const deleted = await this.deleteOneTaskCommand.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return { deleted: true };
  }
}
