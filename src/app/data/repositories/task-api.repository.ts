import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskRepository } from '../../core/repositories/task.repository';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class TaskApiRepository implements TaskRepository {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.app.baseURL;

  getAll() {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }
  toggle(id: string) {
    return this.http.patch<Task>(`${this.baseUrl}/${id}`, {
      completed: true,
    });
  }
}
