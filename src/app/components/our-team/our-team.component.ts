import { Component, ChangeDetectionStrategy, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { RevealDirective } from '../../directives/reveal.directive';
import { StaffService } from '../../services/staff.service';
import { StaffMember } from '../../models/staff.model';

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './our-team.component.html',
})
export class OurTeamComponent {
  private readonly staffService = inject(StaffService);
  private readonly destroyRef = inject(DestroyRef);

  readonly team = signal<StaffMember[]>([]);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);

  constructor() {
    this.staffService
      .getActive()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (staff) => this.team.set(staff),
        error: () => this.loadFailed.set(true),
      });
  }
}
