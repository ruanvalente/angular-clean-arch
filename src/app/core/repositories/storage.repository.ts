import { WritableSignal } from '@angular/core';
import { Task } from '../models/task.model';

export abstract class StorageRepository {
  abstract getTasksSignal(): WritableSignal<Task[]>;
  abstract save(tasks: Task[]): void;
  abstract clear(): void;
}
