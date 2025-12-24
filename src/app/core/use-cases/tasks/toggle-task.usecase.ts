import { inject, Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { Task } from '@/core/models/task.model';
import { StorageRepository } from '@/core/repositories/storage.repository';
import { TaskRepository } from '@/core/repositories/task.repository';

const TASKS_STORAGE_KEY = 'app_tasks';

@Injectable({ providedIn: 'root' })
export class ToggleTaskUseCase {
  private api = inject(TaskRepository);
  private storage = inject(StorageRepository);

  execute(id: string) {
    const currentTasks = this.storage.getItem<Task[]>(TASKS_STORAGE_KEY) || [];
    const existing = currentTasks.find((t) => t.id === id);

    if (!existing) {
      return of(undefined as any);
    }

    const updatedTask = { ...existing, completed: !existing.completed };
    const newList = currentTasks.map((t) => (t.id === id ? updatedTask : t));
    this.storage.setItem<Task[]>(TASKS_STORAGE_KEY, newList);

    const isOnline = typeof window !== 'undefined' && navigator.onLine;

    if (!isOnline) {
      return of(updatedTask);
    }

    return this.api.toggle(id, updatedTask.completed).pipe(
      tap((apiUpdatedTask) => {
        const curr = this.storage.getItem<Task[]>(TASKS_STORAGE_KEY) || [];
        const syncedList = curr.map((t) => (t.id === id ? apiUpdatedTask : t));
        this.storage.setItem<Task[]>(TASKS_STORAGE_KEY, syncedList);
      })
    );
  }
}
