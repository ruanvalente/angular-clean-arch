import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '@/shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '@/shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@/presentation/pages/login-page/login-page.component').then(
            (m) => m.LoginPageComponent
          ),
        data: { title: 'Login' },
      },
    ],
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@/presentation/pages/dashboard-page/dashboard-page.component').then(
            (m) => m.DashboardPageComponent
          ),
        data: { title: 'Dashboard' },
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('@/presentation/pages/tasks-page/tasks-page.component').then(
            (m) => m.TasksPageComponent
          ),
        data: { title: 'Tasks' },
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('@/presentation/pages/settings-page/settings-page.component').then(
            (m) => m.SettingsPageComponent
          ),
        data: { title: 'Settings' },
      },
      {
        path: 'test',
        loadComponent: () =>
          import('@/presentation/pages/test-page/test-page.component').then(
            (m) => m.TestPageComponent
          ),
        data: { title: 'Test' },
      },

    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    data: { title: 'Home' },
  },
];
