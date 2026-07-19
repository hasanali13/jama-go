import { Injectable, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { DiaDashboard } from '../../../models/dia.model';
import { DiaService } from '../../../services/dia.service';
import { getApiErrorMessage } from '../../../utils/api-error.util';

@Injectable()
export class DiaState {
  private readonly service = inject(DiaService);

  readonly dashboard = signal<DiaDashboard | null>(null);
  readonly dashboardLoading = signal(false);
  readonly dashboardError = signal('');

  loadDashboard(): void {
    this.dashboardLoading.set(true);
    this.dashboardError.set('');
    this.service
      .getDashboard()
      .pipe(finalize(() => this.dashboardLoading.set(false)))
      .subscribe({
        next: (dashboard) => this.dashboard.set(dashboard),
        error: (error: unknown) =>
          this.dashboardError.set(getApiErrorMessage(error, 'Unable to load DIA dashboard.')),
      });
  }
}
