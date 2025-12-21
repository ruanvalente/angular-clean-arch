import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/ui/header/header.component';
import { TaskListWidgetComponent } from '../../tasks/widgets/task-list-widget/task-list-widget.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskListWidgetComponent, HeaderComponent],
  template: `
    <app-header />
    <main>
      <h2>Minhas Tarefas</h2>
      <app-task-list-widget />
    </main>
  `,
})
export class TasksPageComponent {}
