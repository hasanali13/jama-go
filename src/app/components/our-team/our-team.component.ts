import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
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

  readonly team = signal<StaffMember[]>([]);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);

  constructor() {
    this.staffService.getActive().subscribe({
      next: (staff) => {
        this.team.set(staff);
        this.loading.set(false);
      },
      error: () => {
        this.loadFailed.set(true);
        this.loading.set(false);
      },
    });
  }
}
