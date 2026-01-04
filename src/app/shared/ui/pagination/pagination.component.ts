import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ContentChild,
  effect,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent<T> {
  items = input.required<T[]>();
  itemsPerPage = input<number>(10);

  pageChange = output<number>();

  @ContentChild(TemplateRef)
  itemTemplate!: TemplateRef<{ $implicit: T }>;

  currentPage = signal(1);

  totalPages = computed(() => Math.ceil(this.items().length / this.itemsPerPage()));

  paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.items().slice(start, end);
  });

  firstItemIndex = computed(() => (this.currentPage() - 1) * this.itemsPerPage() + 1);

  lastItemIndex = computed(() =>
    Math.min(this.currentPage() * this.itemsPerPage(), this.items().length)
  );

  constructor() {
    effect(() => {
      this.pageChange.emit(this.currentPage());
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }

  get canGoNext() {
    return this.currentPage() < this.totalPages();
  }

  get canGoPrevious() {
    return this.currentPage() > 1;
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push(-1);
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < total) {
      if (end < total - 1) pages.push(-1);
      pages.push(total);
    }

    return pages;
  }
}
