import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly router = inject(Router);

  /** Hide marketing header/footer on admin login and admin pages. */
  readonly showPublicShell = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => !this.isAdminRoute(this.router.url)),
      startWith(!this.isAdminRoute(this.router.url)),
    ),
    { initialValue: !this.isAdminRoute(this.router.url) },
  );

  private isAdminRoute(url: string): boolean {
    const path = url.split('?')[0] ?? url;
    return path === '/admin' || path.startsWith('/admin/');
  }
}
