import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { TaskDto } from '@shared-interface';
import { TaskApiService } from '../services/task-api.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  private readonly taskApi = inject(TaskApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly tasks = signal<TaskDto[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  newTitle = '';
  newDescription = '';

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set(null);
    this.taskApi
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: tasks => {
          this.tasks.set(tasks);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Unable to load tasks. Is the API running on port 3001?');
          this.loading.set(false);
        }
      });
  }

  createTask(): void {
    const title = this.newTitle.trim();
    if (!title) {
      return;
    }
    this.taskApi
      .create({ title, description: this.newDescription.trim() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.newTitle = '';
          this.newDescription = '';
          this.refresh();
        },
        error: () => this.error.set('Create failed')
      });
  }

  toggleCompleted(task: TaskDto): void {
    this.taskApi
      .update(task.id, { completed: !task.completed })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.refresh(),
        error: () => this.error.set('Update failed')
      });
  }

  changePriority(task: TaskDto, priority: number): void {
    if (!Number.isFinite(priority) || priority < 1) {
      return;
    }
    this.taskApi
      .updatePriority(task.id, { priority })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: tasks => {
          this.tasks.set(tasks);
        },
        error: () => this.error.set('Priority update failed')
      });
  }

  deleteTask(id: number): void {
    this.taskApi
      .delete(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.refresh(),
        error: () => this.error.set('Delete failed')
      });
  }
}
