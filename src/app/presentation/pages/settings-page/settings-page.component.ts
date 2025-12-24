import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@/shared/ui/header/header.component';
import { SidebarComponent } from '@/shared/ui/sidebar/sidebar.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './settings-page.component.html',
})
export class SettingsPageComponent {}
