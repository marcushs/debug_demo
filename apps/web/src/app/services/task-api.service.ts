import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type {
  CreateTaskInput,
  TaskDto,
  UpdateTaskInput,
  UpdateTaskPriorityInput
} from '@shared-interface';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/tasks';

  getAll(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.baseUrl);
  }

  create(input: CreateTaskInput): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.baseUrl, input);
  }

  update(id: number, input: UpdateTaskInput): Observable<TaskDto> {
    return this.http.put<TaskDto>(`${this.baseUrl}/${id}`, input);
  }

  updatePriority(id: number, input: UpdateTaskPriorityInput): Observable<TaskDto[]> {
    return this.http.put<TaskDto[]>(`${this.baseUrl}/${id}/priority`, input);
  }

  delete(id: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.baseUrl}/${id}`);
  }
}
