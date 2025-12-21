import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { TaskItemComponent } from '../../ui/task-item/task-item.component';
import { GetAllTasksUseCase } from '../../../../core/use-cases/tasks/get-all-tasks.usecase';
import { ToggleTaskUseCase } from '../../../../core/use-cases/tasks/toggle-task.usecase';
import { SyncTasksUseCase } from '../../../../core/use-cases/tasks/sync-tasks.usecase';

@Component({
  selector: 'app-task-list-widget',
  standalone: true,
  imports: [TaskItemComponent, CommonModule],
  template: `
    @for (task of tasks(); track task.id) {
    <app-task-item [task]="task" (onCheck)="handleToggle($event)" />
    }
  `,
})
export class TaskListWidgetComponent {
  private toggleTaskUseCase = inject(ToggleTaskUseCase);
  private syncTaskUseCase = inject(SyncTasksUseCase);

  tasks = signal<Task[]>([]);

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    this.syncTaskUseCase.execute();
  }

  handleToggle(id: string) {
    this.toggleTaskUseCase.execute(id).subscribe(() => {
      this.tasks.update((old) =>
        old.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    });
  }
}
