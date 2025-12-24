import { Injectable } from '@angular/core';
import { StorageRepository } from '@/core/repositories/storage.repository';

@Injectable({ providedIn: 'root' })
export class LocalStorageInfrastructureRepository extends StorageRepository {
  getItem<T>(key: string): T | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    try {
      const data = window.localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      console.error(`Error reading item '${key}' from localStorage:`, error);
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing item '${key}' to localStorage:`, error);
    }
  }

  removeItem(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item '${key}' from localStorage:`, error);
      }
    }
  }
}
