import { Component, Input, OnChanges, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType, ChartOptions } from 'chart.js';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart-widget.component.html',
})
export class ChartWidgetComponent implements OnChanges {
  @Input() type: ChartType = 'line';
  @Input() data!: ChartData;
  @Input() options?: ChartOptions;
  @Input() height: string = '100%';

  public chartType: ChartType = 'line';
  public chartData: ChartData = { labels: [], datasets: [] };
  public chartOptions: ChartConfiguration['options'];

  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.chartType = this.type;
    }

    if (changes['data']) {
      this.chartData = this.data;
    }

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
      scales:
        this.type === 'bar' || this.type === 'line'
          ? {
              y: {
                beginAtZero: true,
              },
            }
          : {},
      ...this.options,
    };
  }
}
