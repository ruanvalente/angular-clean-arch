import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TaskRepository } from '../../repositories/task.repository';
import { StorageRepository } from '../../repositories/storage.repository';

@Injectable({ providedIn: 'root' })
export class SyncTasksUseCase {
  private api = inject(TaskRepository);
  private storage = inject(StorageRepository);

  execute() {
    return this.api.getAll().pipe(
      tap(apiTasks => {
        const localTasks = this.storage.getTasksSignal()();

        const mergedTasks = apiTasks.map(apiTask => {
          const localTask = localTasks.find(t => t.id === apiTask.id);
          if (localTask) {
            return { ...apiTask, completed: localTask.completed };
          }
          return apiTask;
        });

        this.storage.save(mergedTasks);
      })
    );
  }
}
