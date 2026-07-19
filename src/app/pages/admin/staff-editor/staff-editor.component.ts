import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import {
  CreateStaffRequest,
  STAFF_DEPARTMENTS,
  StaffDepartment,
  UpdateStaffRequest,
} from '../../../models/staff.model';
import { StaffService } from '../../../services/staff.service';
import { getApiErrorMessage } from '../../../utils/api-error.util';

interface StaffAccountForm {
  fullName: string;
  email: string;
  password: string;
  department: StaffDepartment | null;
  isActive: boolean;
}

@Component({
  selector: 'app-staff-editor',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './staff-editor.component.html',
  styleUrl: './staff-editor.component.css',
})
export class StaffEditorComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly staffService = inject(StaffService);
  private readonly destroyRef = inject(DestroyRef);

  readonly staffId = this.route.snapshot.paramMap.get('id');
  readonly isEditing = !!this.staffId;
  readonly loading = signal(this.isEditing);
  readonly saving = signal(false);
  readonly hasLoginAccount = signal(false);
  readonly error = signal<string | null>(null);
  readonly departments = STAFF_DEPARTMENTS;

  form: StaffAccountForm = {
    fullName: '',
    email: '',
    password: '',
    department: null,
    isActive: true,
  };

  constructor() {
    if (this.staffId) {
      this.loadStaff(this.staffId);
    }
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.saving()) return;

    this.saving.set(true);
    this.error.set(null);

    const baseRequest = {
      fullName: this.form.fullName.trim(),
      email: this.form.email.trim().toLowerCase(),
      department: this.form.department,
      isActive: this.form.isActive,
    };

    const action = this.staffId
      ? this.staffService.update(this.staffId, {
          ...baseRequest,
          password: this.form.password || null,
        } satisfies UpdateStaffRequest)
      : this.staffService.create({
          ...baseRequest,
          password: this.form.password,
        } satisfies CreateStaffRequest);

    action
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: () => void this.router.navigate(['/admin/staff']),
        error: (error: unknown) =>
          this.error.set(getApiErrorMessage(error, 'Could not save staff member.')),
      });
  }

  cancel(): void {
    void this.router.navigate(['/admin/staff']);
  }

  private loadStaff(id: string): void {
    this.staffService
      .getById(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (member) => {
          this.hasLoginAccount.set(member.hasLoginAccount);
          this.form = {
            fullName: member.fullName,
            email: member.email ?? '',
            password: '',
            department:
              STAFF_DEPARTMENTS.find((option) => option.label === member.department)?.value ?? null,
            isActive: member.isActive,
          };
        },
        error: (error: unknown) =>
          this.error.set(getApiErrorMessage(error, 'Could not load staff member.')),
      });
  }
}
