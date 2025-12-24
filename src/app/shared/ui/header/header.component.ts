import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  title = input<string>('Task Manager');
  user = signal<User>({
    name: 'João Silva',
    avatar: 'https://ui-avatars.com/api/?name=Joao+Silva&background=3b82f6&color=fff',
  });

  showMenu = signal<boolean>(false);

  toggleMenu() {
    this.showMenu.update((value) => !value);
  }

  closeMenu() {
    this.showMenu.set(false);
  }
}
