import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@/shared/ui/sidebar/sidebar.component';
import { HeaderComponent } from '@/shared/ui/header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
