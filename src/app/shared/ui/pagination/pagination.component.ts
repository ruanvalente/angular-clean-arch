import { Component, input, output, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '@/presentation/tasks/ui/task-item/task-item.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  items = input.required<any[]>();
  itemsPerPage = input<number>(5);
  currentPage = output<number>();
  onToggle = output<string>();

  protected Math = Math;

  currentPageSignal = signal<number>(1);
  totalPages = computed(() => {
    return Math.ceil(this.items().length / this.itemsPerPage());
  });

  paginatedItems = computed(() => {
    const items = this.items();
    const perPage = this.itemsPerPage();
    const page = this.currentPageSignal();

    if (!items || items.length === 0) {
      return [];
    }

    const start = (page - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
  });

  constructor() {
    effect(() => {
      const currentPage = this.currentPageSignal();
      this.currentPage.emit(currentPage);
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPageSignal.set(page);
    }
  }

  nextPage() {
    const nextPage = this.currentPageSignal() + 1;
    if (nextPage <= this.totalPages()) {
      this.currentPageSignal.set(nextPage);
    }
  }

  previousPage() {
    const prevPage = this.currentPageSignal() - 1;
    if (prevPage >= 1) {
      this.currentPageSignal.set(prevPage);
    }
  }

  get canGoNext(): boolean {
    return this.currentPageSignal() < this.totalPages();
  }

  get canGoPrevious(): boolean {
    return this.currentPageSignal() > 1;
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPageSignal();
    const pages: number[] = [];

    const startPage = Math.max(1, current - 2);
    const endPage = Math.min(total, current + 2);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push(-1); // -1 representa "..."
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < total) {
      if (endPage < total - 1) {
        pages.push(-1); // -1 representa "..."
      }
      pages.push(total);
    }

    return pages;
  }

  handleToggle(id: string) {
    this.onToggle.emit(id);
  }
}
