import {
  Component,
  signal,
  effect,
  inject,
  afterNextRender,
  OnDestroy
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageRepository } from '@/core/repositories/storage.repository';
import { SidebarNavItemComponent } from './sidebar-nav-item/sidebar-nav-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, SidebarNavItemComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnDestroy {
  private readonly SIDEBAR_KEY = 'sidebarOpen';
  private readonly storageRepository = inject(StorageRepository);

  private mediaQuery?: MediaQueryList;
  private readonly BREAKPOINT = '(max-width: 767px)';

  isMobile = signal<boolean>(false);
  isOpen = signal<boolean>(true);

  navItems = [
    { label: 'Dashboard', icon: '🏠', route: '' },
    { label: 'Tasks', icon: '✓', route: 'tasks' },
    { label: 'Configurations', icon: '⚙', route: 'settings' },
    { label: 'Testings', icon: '🧪', route: 'test' },
  ];


  constructor() {
    afterNextRender(() => {
      this.mediaQuery = window.matchMedia(this.BREAKPOINT);

      this.isMobile.set(this.mediaQuery.matches);
      this.isOpen.set(
        this.isMobile()
          ? false
          : this.getSidebarStateFromStorage()
      );

      this.mediaQuery.addEventListener('change', (event) => {
        this.isMobile.set(event.matches);
      });
    });

    effect(() => {
      if (this.isMobile()) {
        this.isOpen.set(false);
      }
    });

    effect(() => {
      if (!this.isMobile()) {
        this.storageRepository.setItem<boolean>(
          this.SIDEBAR_KEY,
          this.isOpen()
        );
      }
    });
  }

  toggleSidebar() {
    this.isOpen.update((value) => !value);
  }

  private getSidebarStateFromStorage(): boolean {
    const stored = this.storageRepository.getItem<boolean>(this.SIDEBAR_KEY);
    return stored === null ? true : stored;
  }

  ngOnDestroy() {
    this.mediaQuery?.removeEventListener('change', () => {});
  }
}
