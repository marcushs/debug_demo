export interface TaskDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly priority: number;
  readonly completed: boolean;
}

export interface CreateTaskInput {
  readonly title: string;
  readonly description?: string;
}

export interface UpdateTaskInput {
  readonly title?: string;
  readonly description?: string;
  readonly completed?: boolean;
}

export interface UpdateTaskPriorityInput {
  readonly priority: number;
}
