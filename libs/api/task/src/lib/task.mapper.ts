import type { TaskDto } from '@shared-interface';
import type { TaskModel } from '@public-api/model';

export function toTaskDto(model: TaskModel): TaskDto {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    priority: model.priority,
    completed: model.completed
  };
}
