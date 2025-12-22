import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { StorageRepository } from '../../repositories/storage.repository';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class ToggleTaskUseCase {
  private api = inject(TaskRepository);
  private storage = inject(StorageRepository);

  execute(id: string) {
    return this.api.toggle(id).pipe(
      tap(updatedTask => {
        const currentTasks = this.storage.getTasksSignal()();
        const newList = currentTasks.map(t =>
          t.id === id ? updatedTask : t
        );
        this.storage.save(newList);
      })
    );
  }
}
