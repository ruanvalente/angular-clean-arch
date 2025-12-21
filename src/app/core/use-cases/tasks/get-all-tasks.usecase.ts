import { inject, Injectable } from '@angular/core';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class GetAllTasksUseCase {
  private repository = inject(TaskRepository);

  execute() {
    return this.repository.getAll();
  }
}
