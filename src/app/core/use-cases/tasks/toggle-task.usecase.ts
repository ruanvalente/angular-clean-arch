import { inject, Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { StorageRepository } from '../../repositories/storage.repository';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class ToggleTaskUseCase {
  private api = inject(TaskRepository);
  private storage = inject(StorageRepository);

  execute(id: string) {
    const currentTasks = this.storage.getTasksSignal()();
    const existing = currentTasks.find(t => t.id === id);

    if (!existing) {
      return of(undefined as any);
    }

    const updatedTask = { ...existing, completed: !existing.completed };
    const newList = currentTasks.map(t => (t.id === id ? updatedTask : t));
    this.storage.save(newList);

    const isOnline = typeof window !== 'undefined' && navigator.onLine;

    if (!isOnline) {
      return of(updatedTask);
    }

    return this.api.toggle(id, updatedTask.completed).pipe(
      tap(apiUpdatedTask => {
        const curr = this.storage.getTasksSignal()();
        const syncedList = curr.map(t => (t.id === id ? apiUpdatedTask : t));
        this.storage.save(syncedList);
      })
    );
  }
}
