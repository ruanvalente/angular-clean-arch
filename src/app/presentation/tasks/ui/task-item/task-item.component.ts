import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() onCheck = new EventEmitter<string>();
}
