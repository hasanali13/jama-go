import { ChangeDetectionStrategy, Component, input, inject, output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DiaStatus } from '../../../../models/dia.model';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
}

@Component({
  selector: 'app-dia-confirmation-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content><p>{{ data.message }}</p></mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-flat-button [class.danger-button]="data.danger" [mat-dialog-close]="true">
        {{ data.confirmLabel }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    p { max-width: 420px; color: #5d7288; }
    .danger-button { --mdc-filled-button-container-color: #be123c; }
  `,
})
export class DiaConfirmationDialogComponent {
  readonly data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);
}

@Component({
  selector: 'app-dia-status-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="dia-status" [class]="'dia-status dia-status--' + status().toLowerCase()">
    {{ label() }}
  </span>`,
  styles: `
    .dia-status { display:inline-flex;align-items:center;padding:5px 10px;border-radius:999px;font-size:.75rem;font-weight:800;white-space:nowrap;background:#e2e8f0;color:#475569 }
    .dia-status--quarter1 { background:#dbeafe;color:#1d4ed8 }
    .dia-status--quarter2 { background:#cffafe;color:#0e7490 }
    .dia-status--quarter3 { background:#ffedd5;color:#c2410c }
    .dia-status--quarter4 { background:#f3e8ff;color:#7e22ce }
    .dia-status--completed { background:#dcfce7;color:#15803d }
  `,
})
export class DiaStatusChipComponent {
  readonly status = input.required<DiaStatus>();
  readonly label = input.required<string>();
}

@Component({
  selector: 'app-dia-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton" role="status" aria-label="Loading content">
      @for (item of rows; track item) { <span></span> }
    </div>
  `,
  styles: `
    .skeleton{display:grid;gap:12px}.skeleton span{display:block;height:56px;border-radius:14px;background:linear-gradient(90deg,#e8eef4 25%,#f7fafc 50%,#e8eef4 75%);background-size:200% 100%;animation:shine 1.4s infinite}@keyframes shine{to{background-position:-200% 0}}
  `,
})
export class DiaSkeletonComponent {
  protected readonly rows = [1, 2, 3, 4];
}

@Component({
  selector: 'app-dia-empty-state',
  standalone: true,
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="state" role="status">
      <span aria-hidden="true">◇</span>
      <strong>{{ title() }}</strong>
      <p>{{ message() }}</p>
      @if (actionLabel()) {
        <button mat-stroked-button type="button" (click)="action.emit()">{{ actionLabel() }}</button>
      }
    </div>
  `,
  styles: `
    .state{display:grid;place-items:center;text-align:center;gap:8px;padding:48px 20px;color:#5d7288}.state>span{font-size:2.2rem;color:#2594d2}.state strong{font:700 1.05rem Sora,Inter,sans-serif;color:#0b1f33}.state p{max-width:440px}
  `,
})
export class DiaEmptyStateComponent {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly actionLabel = input('');
  readonly action = output<void>();
}
