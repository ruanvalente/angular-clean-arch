import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () =>
      import('@/presentation/pages/tasks-page/tasks-page.component').then(
        (m) => m.TasksPageComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('@/presentation/pages/settings-page/settings-page.component').then(
        (m) => m.SettingsPageComponent
      ),
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
];
