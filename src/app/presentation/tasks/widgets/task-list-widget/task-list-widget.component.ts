import { Task } from '@/core/models/task.model';
import { StorageRepository } from '@/core/repositories/storage.repository';
import { SyncTasksUseCase } from '@/core/use-cases/tasks/sync-tasks.usecase';
import { ToggleTaskUseCase } from '@/core/use-cases/tasks/toggle-task.usecase';
import { PaginationComponent } from '@/shared/ui/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';

const TASKS_STORAGE_KEY = 'app_tasks';

@Component({
  selector: 'app-task-list-widget',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './task-list-widget.component.html',
})
export class TaskListWidgetComponent implements OnInit {
  private toggleTaskUseCase = inject(ToggleTaskUseCase);
  private syncTaskUseCase = inject(SyncTasksUseCase);
  private storage = inject(StorageRepository);

  tasks = signal<Task[]>(this.storage.getItem<Task[]>(TASKS_STORAGE_KEY) || []);

  constructor() {
    effect(() => {
      const stored = this.storage.getItem<Task[]>(TASKS_STORAGE_KEY);
      if (stored) {
        this.tasks.set(stored);
      }
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    const current = this.storage.getItem<Task[]>(TASKS_STORAGE_KEY) || [];
    const isOnline = typeof window !== 'undefined' && navigator.onLine;

    if (current && current.length > 0) {
      if (isOnline) {
        setTimeout(() => {
          this.syncTaskUseCase.execute().subscribe({
            next: () => {
              const updated = this.storage.getItem<Task[]>(TASKS_STORAGE_KEY) || [];
              this.tasks.set(updated);
              console.log('Background sync completed');
            },
            error: (err) => console.warn('Background sync failed:', err),
          });
        }, 500);
      }
      return;
    }

    if (isOnline) {
      this.syncTaskUseCase.execute().subscribe({
        next: () => {
          const updated = this.storage.getItem<Task[]>(TASKS_STORAGE_KEY) || [];
          this.tasks.set(updated);
          console.log('Initial tasks loaded from API');
        },
        error: (err) => console.error('Initial load error:', err),
      });
    }
  }

  handleToggle(id: string) {
    this.toggleTaskUseCase.execute(id).subscribe({
      next: () => {
        const updated = this.storage.getItem<Task[]>(TASKS_STORAGE_KEY) || [];
        this.tasks.set(updated);
        console.log('Task toggled successfully:', id);
      },
      error: (err) => console.error('Toggle error:', err),
    });
  }
}
