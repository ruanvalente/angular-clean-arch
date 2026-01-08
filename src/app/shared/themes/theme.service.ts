import { Inject, Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


import { LocalStorageInfrastructureRepository } from '@/infrastructure/repositories/local-storage.repository';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'app-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _storage = inject(LocalStorageInfrastructureRepository);
  private readonly _theme = signal<Theme>('light');

  readonly theme = this._theme.asReadonly();

  readonly isDark = () => this._theme() === 'dark';
  readonly isLight = () => this._theme() === 'light';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this._theme.set(this.getInitialTheme());

    effect(() => {
      const theme = this._theme();
      this.applyTheme(theme);
      theme;
      this._storage.setItem(STORAGE_KEY, theme);
    });
  }

  setDark(): void {
    this._theme.set('dark');
  }

  setLight(): void {
    this._theme.set('light');
  }

  toggle(): void {
    this._theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private getInitialTheme(): Theme {
    const stored = this._storage.getItem<Theme>(STORAGE_KEY);

    if (stored === 'dark' || stored === 'light') {
      return stored;
    }

    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return 'light';
  }

  private applyTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}
