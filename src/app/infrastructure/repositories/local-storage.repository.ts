import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '@/core/models/task.model';
import { StorageRepository } from '@/core/repositories/storage.repository';

@Injectable({ providedIn: 'root' })
export class LocalStorageInfrastructureRepository extends StorageRepository {
  private readonly STORAGE_KEY = 'app_tasks';

  private tasksSignal: WritableSignal<Task[]>;

  constructor() {
    super();
    const initialTasks = this.loadFromDisk();
    this.tasksSignal = signal<Task[]>(initialTasks);
  }

  getTasksSignal(): WritableSignal<Task[]> {
    return this.tasksSignal;
  }

  save(tasks: Task[]): void {
    this.tasksSignal.set(tasks);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }

  clear(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.tasksSignal.set([]);
  }

  private loadFromDisk(): Task[] {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    try {
      const data = window.localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  }
}
