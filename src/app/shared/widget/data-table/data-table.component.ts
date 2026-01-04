import { CommonModule } from '@angular/common';
import { Component, ContentChild, effect, inject, input, output, TemplateRef } from '@angular/core';

import { ConfirmModalComponent } from '@/shared/ui/modal/confirm-modal.component';
import { PaginationComponent } from '@/shared/ui/pagination/pagination.component';

import { DataTableComponentService } from './data-table.component.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, ConfirmModalComponent, PaginationComponent],
  providers: [DataTableComponentService],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent<T> {
  readonly table = inject(DataTableComponentService<T>);

  @ContentChild('actionsTemplate')
  actionsTemplate?: TemplateRef<any>;

  data = input<Array<T>>([]);
  columns = input<Array<string>>();
  pageSizeOptions = input<Array<number>>([5, 10, 20, 50]);
  hasActions = input(true);
  edit = output<T>();
  delete = output<T>();

  itemToDelete: T | null = null;

  constructor() {
    effect(() => {
      this.table.setData(this.data());
    });
  }

  requestDelete(item: T) {
    this.itemToDelete = item;
  }

  confirmDelete() {
    this.delete.emit(this.itemToDelete!);
    this.itemToDelete = null;
  }

  getCellValue(row: T, column: string): unknown {
    return (row as any)[column];
  }

  get totalColumns(): number {
    return this.columns.length + (this.hasActions() ? 1 : 0);
  }
}
