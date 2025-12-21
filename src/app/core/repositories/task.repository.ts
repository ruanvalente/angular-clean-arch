import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

export abstract class TaskRepository {
  abstract getAll(): Observable<Task[]>;
  abstract toggle(id: string): Observable<Task>;
}
