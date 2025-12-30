import { ChartWidgetComponent } from '@/shared/widget/chart/chart-widget.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, ChartWidgetComponent],
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent {
  revenueChartData: ChartData<'line'> = {
    labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Revenue Monthly ($)',
        data: [32000, 38000, 42000, 41000, 45231, 48000, 55231],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  revenueChartOptions: ChartOptions = {
    scales: {
      y: {
        ticks: {
          callback: (value) => '$' + value,
        },
      },
    },
  };
}
