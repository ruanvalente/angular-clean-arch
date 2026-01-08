import { LocalStorageInfrastructureRepository } from '@/infrastructure/repositories/local-storage.repository';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'app-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _theme = signal<Theme>(this.getInitialTheme());
  private readonly _storage = inject(LocalStorageInfrastructureRepository);

  readonly theme = this._theme.asReadonly();

  readonly isDark = () => this._theme() === 'dark';
  readonly isLight = () => this._theme() === 'light';

  constructor() {
    effect(() => {
      const theme = this._theme();
      this.applyTheme(theme);
      this._storage.setItem(STORAGE_KEY, theme);
    });
  }

  toggle(): void {
    this._theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  setDark(): void {
    this._theme.set('dark');
  }

  setLight(): void {
    this._theme.set('light');
  }

  private getInitialTheme(): Theme {
    const stored = this._storage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }
}
