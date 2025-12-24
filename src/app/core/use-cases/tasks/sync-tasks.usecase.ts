import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Task } from '@/core/models/task.model';
import { TaskRepository } from '@/core/repositories/task.repository';
import { StorageRepository } from '@/core/repositories/storage.repository';

const TASKS_STORAGE_KEY = 'app_tasks';

@Injectable({ providedIn: 'root' })
export class SyncTasksUseCase {
  private api = inject(TaskRepository);
  private storage = inject(StorageRepository);

  execute() {
    return this.api.getAll().pipe(
      tap((apiTasks) => {
        const localTasks = this.storage.getItem<Task[]>(TASKS_STORAGE_KEY) || [];

        const mergedTasks = apiTasks.map((apiTask) => {
          const localTask = localTasks.find((t) => t.id === apiTask.id);
          if (localTask) {
            return { ...apiTask, completed: localTask.completed };
          }
          return apiTask;
        });

        this.storage.setItem<Task[]>(TASKS_STORAGE_KEY, mergedTasks);
      })
    );
  }
}
