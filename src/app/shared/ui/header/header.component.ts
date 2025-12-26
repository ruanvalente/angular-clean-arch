import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

interface User {
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user = signal<User>({
    name: 'João Silva',
    avatar: 'https://ui-avatars.com/api/?name=Joao+Silva&background=3b82f6&color=fff',
  });

  showMenu = signal<boolean>(false);
  private _title = signal('My System');
  title = this._title.asReadonly();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
      let current = this.route.firstChild;

      while (current?.firstChild) {
        current = current.firstChild;
      }

      const titleFromRoute = current?.snapshot.data['title'];
      this._title.set(titleFromRoute ?? 'My System');
    });
  }

  toggleMenu() {
    this.showMenu.update((value) => !value);
  }

  closeMenu() {
    this.showMenu.set(false);
  }
}
