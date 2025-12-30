import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '@/core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  task = input.required<Task>();
  onCheck = output<string>();

  handleToggle() {
    this.onCheck.emit(this.task().id);
  }
}
