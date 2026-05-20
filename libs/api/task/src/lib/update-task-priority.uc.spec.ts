import { UpdateTaskPriorityUC } from './update-task-priority.uc';
import { GetManyTasksQueryInMemory } from './inmemory/get-many-tasks.query.inmemory';
import { SaveAllTasksCommandInMemory } from './inmemory/save-all-tasks.command.inmemory';
import { resetTaskInMemoryStore } from './inmemory/task.inmemory-store';

describe('(unit) UpdateTaskPriorityUC', () => {
  let uc: UpdateTaskPriorityUC;

  beforeEach(() => {
    resetTaskInMemoryStore([
      { id: 1, title: 'Alpha', description: '', priority: 1, completed: false },
      { id: 2, title: 'Bravo', description: '', priority: 2, completed: false },
      { id: 3, title: 'Charlie', description: '', priority: 3, completed: false }
    ]);
    uc = new UpdateTaskPriorityUC(new GetManyTasksQueryInMemory(), new SaveAllTasksCommandInMemory());
  });

  /**
   * Workshop: fails until the final renumbering loop uses 1-based priorities (i + 1).
   */
  it('renumbers all tasks to consecutive priorities 1..n after a move up', async () => {
    const result = await uc.handle(2, 1);

    expect(result.map(task => task.priority)).toEqual([1, 2, 3]);
    expect(result.find(task => task.id === 2)?.priority).toBe(1);
  });

  it('renumbers all tasks to consecutive priorities 1..n after a move down', async () => {
    const result = await uc.handle(2, 3);

    expect(result.map(task => task.priority)).toEqual([1, 2, 3]);
    expect(result.find(task => task.id === 2)?.priority).toBe(3);
    expect(result.find(task => task.id === 3)?.priority).toBe(2);
  });
});
