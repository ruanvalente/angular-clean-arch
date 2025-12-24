import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-nav-item',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar-nav-item.component.html',
})
export class SidebarNavItemComponent {
  label = input.required<string>();
  icon = input.required<string>();
  route = input.required<string>();
  isActive = input<boolean>(false);
}
