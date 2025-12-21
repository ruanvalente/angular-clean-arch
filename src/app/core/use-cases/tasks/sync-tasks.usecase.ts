import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Task } from '../../models/task.model';
import { StorageRepository } from '../../repositories/storage.repository';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class SyncTasksUseCase {
  private api = inject(TaskRepository);
  private storage = inject(StorageRepository);

  execute() {
    return this.api.getAll().pipe(tap((tasks: Task[]) => this.storage.save(tasks)));
  }
}
