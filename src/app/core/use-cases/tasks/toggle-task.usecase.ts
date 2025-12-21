import { inject, Injectable } from '@angular/core';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class ToggleTaskUseCase {
  private repository = inject(TaskRepository);

  execute(id: string) {
    return this.repository.toggle(id);
  }
}
