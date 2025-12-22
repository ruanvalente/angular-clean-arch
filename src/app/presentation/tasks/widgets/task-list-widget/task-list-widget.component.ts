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
    this.syncTaskUseCase.execute().subscribe()
  }

  handleToggle(id: string) {
    this.toggleTaskUseCase.execute(id).subscribe()
  }
}
