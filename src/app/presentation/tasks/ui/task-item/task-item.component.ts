import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  template: `
    <div (click)="onCheck.emit(task.id)">
      <input type="checkbox" [checked]="task.completed" /> {{ task.title }}
    </div>
  `,
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() onCheck = new EventEmitter<string>();
}
