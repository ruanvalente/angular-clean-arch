import { Observable } from 'rxjs';
import { Task } from '@/core/models/task.model';

export abstract class TaskRepository {
  abstract getAll(): Observable<Task[]>;
  abstract toggle(id: string, completed: boolean): Observable<Task>;
}
