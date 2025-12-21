import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/tasks-page/tasks-page.component').then(
        (m) => m.TasksPageComponent
      ),
  },
];
