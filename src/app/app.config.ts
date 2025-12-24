import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { StorageRepository } from '@/core/repositories/storage.repository';
import { TaskRepository } from '@/core/repositories/task.repository';
import { LocalStorageInfrastructureRepository } from '@/infrastructure/repositories/local-storage.repository';
import { TaskApiInfrastructureRepository } from '@/infrastructure/repositories/task-api.repository';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    {
      provide: TaskRepository,
      useClass: TaskApiInfrastructureRepository,
    },
    {
      provide: StorageRepository,
      useClass: LocalStorageInfrastructureRepository,
    },
  ],
};
