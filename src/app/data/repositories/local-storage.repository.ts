import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { StorageRepository } from '../../core/repositories/storage.repository';

@Injectable({ providedIn: 'root' })
export class LocalStorageRepository extends StorageRepository {
  private readonly STORAGE_KEY = 'app_tasks';

  private tasksSignal = signal<Task[]>(this.loadFromDisk());

  getTasksSignal(): WritableSignal<Task[]> {
    return this.tasksSignal;
  }

  save(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    this.tasksSignal.set(tasks);
  }

  clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.tasksSignal.set([]);
  }

  private loadFromDisk(): Task[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
