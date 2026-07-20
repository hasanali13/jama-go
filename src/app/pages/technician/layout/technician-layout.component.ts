import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-technician-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule],
  template: `
    <div class="tech-shell">
      <header class="tech-topbar">
        <a routerLink="/technician" class="tech-brand">
          <strong>Jama Go Technician</strong>
          <span>Quarterly DIA inspections</span>
        </a>
        <div class="tech-header-actions">
          <span>{{ auth.currentUser()?.fullName }}</span>
          <button mat-stroked-button type="button" (click)="auth.logout()">Sign out</button>
        </div>
      </header>
      <main class="tech-content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: '../technician.styles.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicianLayoutComponent {
  protected readonly auth = inject(AuthService);
}
