import { Component, signal, effect, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { StorageRepository } from '@/core/repositories/storage.repository';
import { SidebarNavItemComponent } from './sidebar-nav-item/sidebar-nav-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, SidebarNavItemComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private readonly SIDEBAR_KEY = 'sidebarOpen';
  private readonly storageRepository = inject(StorageRepository);

  isOpen = signal<boolean>(this.getSidebarStateFromStorage());

  navItems = [
    { label: 'Tarefas', icon: '✓', route: 'tasks' },
    { label: 'Configurações', icon: '⚙', route: 'settings' },
    { label: 'Teste', icon: '🧪', route: 'test' },
  ];

  constructor() {
    effect(() => {
      const isOpenState = this.isOpen();
      this.storageRepository.setItem<boolean>(this.SIDEBAR_KEY, isOpenState);
    });
  }

  toggleSidebar() {
    this.isOpen.update((value) => !value);
  }

  private getSidebarStateFromStorage(): boolean {
    const stored = this.storageRepository.getItem<boolean>(this.SIDEBAR_KEY);
    return stored === null ? true : stored;
  }
}
