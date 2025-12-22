import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskItemComponent } from '../../ui/task-item/task-item.component';
import { ToggleTaskUseCase } from '../../../../core/use-cases/tasks/toggle-task.usecase';
import { SyncTasksUseCase } from '../../../../core/use-cases/tasks/sync-tasks.usecase';
import { StorageRepository } from '../../../../core/repositories/storage.repository';

@Component({
  selector: 'app-task-list-widget',
  standalone: true,
  imports: [TaskItemComponent, CommonModule],
  templateUrl: './task-list-widget.component.html',
})
export class TaskListWidgetComponent implements OnInit {
  private toggleTaskUseCase = inject(ToggleTaskUseCase);
  private syncTaskUseCase = inject(SyncTasksUseCase);
  private storage = inject(StorageRepository);

  tasks = this.storage.getTasksSignal();

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    const current = this.storage.getTasksSignal()();
    const isOnline = typeof window !== 'undefined' && navigator.onLine;

    if (current && current.length > 0) {

      if (isOnline) {
        setTimeout(() => {
          this.syncTaskUseCase.execute().subscribe({
            next: () => console.log('Background sync completed'),
            error: (err) => console.warn('Background sync failed:', err)
          });
        }, 500);
      }
      return;
    }

    if (isOnline) {
      console.log('No local tasks, fetching from API');
      this.syncTaskUseCase.execute().subscribe({
        next: () => console.log('Initial tasks loaded from API'),
        error: (err) => console.error('Initial load error:', err)
      });
    }
  }

  handleToggle(id: string) {
    console.log('Toggle task:', id);
    this.toggleTaskUseCase.execute(id).subscribe({
      next: () => console.log('Task toggled successfully:', id),
      error: (err) => console.error('Toggle error:', err)
    });
  }
}
