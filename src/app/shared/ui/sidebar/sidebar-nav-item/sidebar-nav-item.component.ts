import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar-nav-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar-nav-item.component.html',
})
export class SidebarNavItemComponent {
  label = input.required<string>();
  icon = input.required<string>();
  route = input.required<string>();
  isActive = input<boolean>(false);
}
