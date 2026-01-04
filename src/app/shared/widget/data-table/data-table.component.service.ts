import { Injectable, signal, computed } from '@angular/core';

@Injectable()
export class DataTableComponentService<T> {
  private _data = signal<Array<T>>([]);
  private _pageSize = signal(10);
  private _currentPage = signal(1);

  readonly data = this._data.asReadonly();
  readonly pageSize = this._pageSize.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();

  readonly totalItems = computed(() => this._data().length);

  readonly totalPages = computed(() => Math.ceil(this.totalItems() / this._pageSize()));

  readonly pagedData = computed(() => {
    const start = (this._currentPage() - 1) * this._pageSize();
    return this._data().slice(start, start + this._pageSize());
  });

  setData(data: Array<T>) {
    this._data.set(data ?? []);
    this._currentPage.set(1);
  }

  setPageSize(size: number) {
    this._pageSize.set(size);
    this._currentPage.set(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this._currentPage.set(page);
    }
  }

  reset() {
    this._currentPage.set(1);
  }
}
