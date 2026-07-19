import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { AdminStaffMember } from '../../../models/staff.model';
import { AuthService } from '../../../services/auth.service';
import { StaffService } from '../../../services/staff.service';
import { getApiErrorMessage } from '../../../utils/api-error.util';

@Component({
  selector: 'app-staff-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.css',
})
export class StaffProfileComponent {
  readonly auth = inject(AuthService);
  private readonly staffService = inject(StaffService);
  private readonly destroyRef = inject(DestroyRef);

  readonly profile = signal<AdminStaffMember | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading.set(true);
    this.error.set(null);

    this.staffService
      .getMine()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (profile) => this.profile.set(profile),
        error: (error: unknown) =>
          this.error.set(getApiErrorMessage(error, 'Could not load your profile.')),
      });
  }

  logout(): void {
    this.auth.logout();
  }
}
