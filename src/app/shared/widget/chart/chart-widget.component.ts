import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, Inject, input, PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart-widget.component.html',
})
export class ChartWidgetComponent {
  type = input<ChartType>('line');
  data = input.required<ChartData>();
  options = input<ChartOptions>({});
  height = input<string>('100%');

  public chartType = this.type;
  public chartData = this.data;

  public chartOptions = computed<ChartConfiguration['options']>(() => {
    const chartType = this.type();

    const defaultOptions: ChartOptions = {
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
      scales: chartType === 'bar' || chartType === 'line'
        ? {
            y: {
              beginAtZero: true,
            },
          }
        : {},
    };

    return { ...defaultOptions, ...this.options() };
  });

  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
}
