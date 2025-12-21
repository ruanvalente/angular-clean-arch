import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { TaskRepository } from './core/repositories/task.repository';
import { TaskApiRepository } from './data/repositories/task-api.repository';
import { LocalStorageRepository } from './data/repositories/local-storage.repository';
import { StorageRepository } from './core/repositories/storage.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    {
      provide: TaskRepository,
      useClass: TaskApiRepository,
    },
    {
      provide: StorageRepository,
      useClass: LocalStorageRepository,
    },
  ],
};
