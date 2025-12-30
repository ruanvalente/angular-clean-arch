import { TaskListWidgetComponent } from '@/presentation/features/tasks/widgets/task-list-widget/task-list-widget.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskListWidgetComponent],
  templateUrl: './task-page.component.html',
})
export class TasksPageComponent {}
