import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';
import { ChartWidgetComponent } from '@/shared/widget/chart/chart-widget.component';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, ChartWidgetComponent],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent {
  usersChartData: ChartData<'bar'> = {
    labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Active Users',
        data: [1800, 2100, 2350, 2200, 2500, 2800, 3200],
        backgroundColor: '#10b981',
        borderColor: '#059669',
        borderWidth: 1,
      },
    ],
  };
}
