import type { TaskDto, UpdateTaskInput } from '@shared-interface';

export interface IUpdateOneTaskCommand {
  update(id: number, input: UpdateTaskInput): Promise<TaskDto | null>;
}
