import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DiaState } from '../dia-state.service';
import { DiaEmptyStateComponent, DiaSkeletonComponent } from '../shared/dia-shared.components';

@Component({
  selector: 'app-dia-dashboard',
  standalone: true,
  imports: [RouterLink, MatButtonModule, DiaSkeletonComponent, DiaEmptyStateComponent],
  templateUrl: './dia-dashboard.component.html',
  styleUrl: '../dia.styles.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaDashboardComponent implements OnInit {
  protected readonly state = inject(DiaState);

  ngOnInit(): void {
    this.state.loadDashboard();
  }
}
