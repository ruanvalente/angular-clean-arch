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
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user = signal<User>({
    name: 'Ruan Valente',
    avatar:
      'https://avatars.githubusercontent.com/u/6674232?s=400&u=62eb573c8af66e882bbf633187e0f247714d30ec&v=4',
  });

  showMenu = signal<boolean>(false);
  private _title = signal('My System');
  title = this._title.asReadonly();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
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
