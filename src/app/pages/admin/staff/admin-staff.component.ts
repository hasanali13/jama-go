import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaffService } from '../../../services/staff.service';
import { CreateStaffRequest, StaffMember, UpdateStaffRequest } from '../../../models/staff.model';

type StaffFormModel = CreateStaffRequest & { isActive: boolean };

@Component({
  selector: 'app-admin-staff',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-staff.component.html',
  styleUrl: './admin-staff.component.css',
})
export class AdminStaffComponent {
  private readonly staffService = inject(StaffService);

  readonly staff = signal<StaffMember[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly editingId = signal<string | null>(null);
  readonly showForm = signal(false);

  form: StaffFormModel = this.emptyForm();

  constructor() {
    this.loadStaff();
  }

  loadStaff(): void {
    this.loading.set(true);
    this.error.set(null);

    this.staffService.getAll().subscribe({
      next: (items) => {
        this.staff.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load staff.');
        this.loading.set(false);
      },
    });
  }

  startCreate(): void {
    this.editingId.set(null);
    this.form = this.emptyForm();
    this.showForm.set(true);
  }

  startEdit(member: StaffMember): void {
    this.editingId.set(member.id);
    this.form = {
      fullName: member.fullName,
      role: member.role,
      responsibility: member.responsibility,
      department: member.department,
      displayOrder: member.displayOrder,
      isActive: member.isActive,
    };
    this.showForm.set(true);
  }

  cancelForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.form = this.emptyForm();
  }

  save(event: Event): void {
    event.preventDefault();
    if (this.saving()) {
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const editingId = this.editingId();
    const request = {
      fullName: this.form.fullName.trim(),
      role: this.form.role.trim(),
      responsibility: this.form.responsibility.trim(),
      department: this.form.department?.trim() || null,
      displayOrder: Number(this.form.displayOrder) || 0,
      isActive: this.form.isActive,
    };

    const action = editingId
      ? this.staffService.update(editingId, request as UpdateStaffRequest)
      : this.staffService.create(request);

    action.subscribe({
      next: () => {
        this.saving.set(false);
        this.cancelForm();
        this.loadStaff();
      },
      error: () => {
        this.saving.set(false);
        this.error.set('Could not save staff member.');
      },
    });
  }

  remove(member: StaffMember): void {
    if (!confirm(`Delete ${member.fullName}?`)) {
      return;
    }

    this.staffService.delete(member.id).subscribe({
      next: () => this.loadStaff(),
      error: () => this.error.set('Could not delete staff member.'),
    });
  }

  private emptyForm(): StaffFormModel {
    return {
      fullName: '',
      role: '',
      responsibility: '',
      department: null,
      displayOrder: 0,
      isActive: true,
    };
  }
}
