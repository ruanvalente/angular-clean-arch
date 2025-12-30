import { Component } from '@angular/core';
import { LineChartComponent } from '@/shared/ui/chart/line/line-chart.component';
import { BarChartComponent } from '@/shared/ui/chart/bar/bar-chart.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  imports: [LineChartComponent, BarChartComponent],
})
export class DashboardPageComponent {}
