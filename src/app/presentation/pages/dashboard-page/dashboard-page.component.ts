import { Component } from '@angular/core';
import { LineChartComponent } from '@/shared/ui/chart/line/line-chart.component';
import { BarChartComponent } from '@/shared/ui/chart/bar/bar-chart.component';
import { DataTableComponent } from '@/shared/widget/data-table/data-table.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  imports: [LineChartComponent, BarChartComponent, DataTableComponent],
})
export class DashboardPageComponent {
  readonly dataTableExample = [
    { id: 1, name: 'Ruan Valente', email: 'ruan@email.com', role: 'Admin' },
    { id: 2, name: 'João Silva', email: 'joao@email.com', role: 'User' },
    { id: 3, name: 'Maria Souza', email: 'maria@email.com', role: 'User' },
    { id: 4, name: 'Pedro Costa', email: 'pedro@email.com', role: 'Moderator' },
    { id: 5, name: 'Ana Oliveira', email: 'ana@email.com', role: 'User' },
    { id: 6, name: 'Lucas Santos', email: 'lucas@email.com', role: 'User' },
    { id: 7, name: 'Julia Ferreira', email: 'julia@email.com', role: 'Admin' },
    { id: 8, name: 'Marcos Lima', email: 'marcos@email.com', role: 'User' },
    { id: 9, name: 'Beatriz Alves', email: 'beatriz@email.com', role: 'Moderator' },
    { id: 10, name: 'Gabriel Rocha', email: 'gabriel@email.com', role: 'User' },
    { id: 11, name: 'Camila Mendes', email: 'camila@email.com', role: 'User' },
    { id: 12, name: 'Felipe Cardoso', email: 'felipe@email.com', role: 'Admin' },
  ];
  readonly dataTableColumns = ['id', 'name', 'email', 'role'];

  onEdit(data: any) {
    console.log('Editar:', data);
  }

  onDelete(data: any) {
    console.log('onDelete:', data);
  }
}
