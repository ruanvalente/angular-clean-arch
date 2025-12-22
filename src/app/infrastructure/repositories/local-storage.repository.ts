import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { StorageRepository } from '../../core/repositories/storage.repository';

@Injectable({ providedIn: 'root' })
export class LocalStorageInfrastructureRepository extends StorageRepository {
  private readonly STORAGE_KEY = 'app_tasks';

  private tasksSignal = signal<Task[]>([]);

  constructor() {
    super();
    if (typeof window !== 'undefined' && localStorage) {
      this.tasksSignal.set(this.loadFromDisk());
    }
  }

  getTasksSignal(): WritableSignal<Task[]> {
    return this.tasksSignal;
  }

  save(tasks: Task[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
    this.tasksSignal.set(tasks);
  }

  clear(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.tasksSignal.set([]);
  }

  private loadFromDisk(): Task[] {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const data = window.localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
