import { TaskListWidgetComponent } from '@/presentation/tasks/widgets/task-list-widget/task-list-widget.component';
import { HeaderComponent } from '@/shared/ui/header/header.component';
import { SidebarComponent } from '@/shared/ui/sidebar/sidebar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskListWidgetComponent, HeaderComponent, SidebarComponent],
  templateUrl: './task-page.component.html',
})
export class TasksPageComponent {}
