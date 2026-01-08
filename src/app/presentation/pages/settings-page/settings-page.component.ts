import { ThemeService } from '@/shared/themes/theme.service';
import { Component, inject } from '@angular/core';


@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [],
  templateUrl: './settings-page.component.html',
})
export class SettingsPageComponent {
  readonly themeService = inject(ThemeService);

}
