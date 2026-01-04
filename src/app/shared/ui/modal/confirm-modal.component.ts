import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
  title = input<string>('Confirm Action');
  message = input<string>(
    'Your are about to perform an important action. Are you sure you want to proceed?'
  );
  confirm = output<void>();
  cancel = output<void>();
}
