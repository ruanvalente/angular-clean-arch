import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarNavItemComponent } from './sidebar-nav-item/sidebar-nav-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarNavItemComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isOpen = signal<boolean>(true);

  navItems = [
    { label: 'Tarefas', icon: '✓', route: '/tasks' },
    { label: 'Configurações', icon: '⚙', route: '/settings' },
  ];

  toggleSidebar() {
    this.isOpen.update((value) => !value);
  }
}
