import type { TaskDto } from '@shared-interface';

let nextId = 1;

export function resetTaskInMemoryStore(seed: TaskDto[] = []): void {
  taskInMemoryStore.length = 0;
  for (const task of seed) {
    taskInMemoryStore.push({ ...task });
  }
  nextId = seed.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

export const taskInMemoryStore: TaskDto[] = [];

export function allocateTaskId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}
