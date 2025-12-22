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
import { TaskApiInfrastructureRepository } from './infrastructure/repositories/task-api.repository';
import { LocalStorageInfrastructureRepository } from './infrastructure/repositories/local-storage.repository';
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
      useClass: TaskApiInfrastructureRepository,
    },
    {
      provide: StorageRepository,
      useClass: LocalStorageInfrastructureRepository,
    },
  ],
};
