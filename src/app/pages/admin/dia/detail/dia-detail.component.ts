import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, filter, finalize, switchMap } from 'rxjs';
import { Dia, DiaStatus } from '../../../../models/dia.model';
import { DiaService } from '../../../../services/dia.service';
import { getApiErrorMessage } from '../../../../utils/api-error.util';
import {
  ConfirmationDialogData,
  DiaConfirmationDialogComponent,
  DiaEmptyStateComponent,
  DiaSkeletonComponent,
  DiaStatusChipComponent,
} from '../shared/dia-shared.components';

@Component({
  selector: 'app-dia-detail',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    DiaEmptyStateComponent,
    DiaSkeletonComponent,
    DiaStatusChipComponent,
  ],
  templateUrl: './dia-detail.component.html',
  styleUrl: '../dia.styles.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiaDetailComponent implements OnInit {
  private readonly service = inject(DiaService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly id = this.route.snapshot.paramMap.get('id') ?? '';
  protected readonly dia = signal<Dia | null>(null);
  protected readonly loading = signal(true);
  protected readonly acting = signal(false);
  protected readonly error = signal('');

  ngOnInit(): void {
    this.load();
  }

  protected statusLabel(status: DiaStatus): string {
    return status.startsWith('Quarter') ? `Quarter ${status.slice(-1)}` : status;
  }

  protected progress(item: Dia): number {
    return Math.max(0, Math.min(100, item.progressPercent));
  }

  protected confirm(action: 'activate' | 'deactivate' | 'archive'): void {
    const item = this.dia();
    if (!item || this.acting()) return;
    const definitions: Record<typeof action, ConfirmationDialogData> = {
      activate: {
        title: 'Activate DIA inspection?',
        message: `${item.diaNumber} will begin its quarterly schedule.`,
        confirmLabel: 'Activate',
      },
      deactivate: {
        title: 'Deactivate DIA inspection?',
        message: `${item.diaNumber} will stop its active schedule.`,
        confirmLabel: 'Deactivate',
      },
      archive: {
        title: 'Archive DIA inspection?',
        message: `${item.diaNumber} will be removed from the active register. This cannot be undone.`,
        confirmLabel: 'Archive',
        danger: true,
      },
    };
    this.dialog
      .open(DiaConfirmationDialogComponent, { data: definitions[action], width: '460px' })
      .afterClosed()
      .pipe(
        filter((confirmed): confirmed is true => confirmed === true),
        switchMap(() => {
          this.acting.set(true);
          const request: Observable<unknown> =
            action === 'activate'
              ? this.service.activate(item.id)
              : action === 'deactivate'
                ? this.service.deactivate(item.id)
                : this.service.archive(item.id);
          return request.pipe(finalize(() => this.acting.set(false)));
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.snackBar.open(`DIA ${action}d successfully.`, 'Dismiss', { duration: 3500 });
          if (action === 'archive') {
            void this.router.navigate(['/admin/dia/list']);
          } else {
            this.load();
          }
        },
        error: (error: unknown) =>
          this.snackBar.open(getApiErrorMessage(error, `Unable to ${action} DIA.`), 'Dismiss', {
            duration: 6000,
          }),
      });
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set('');
    this.service
      .getById(this.id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (dia) => this.dia.set(dia),
        error: (error: unknown) =>
          this.error.set(getApiErrorMessage(error, 'Unable to load this DIA inspection.')),
      });
  }
}
