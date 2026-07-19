import { Component, ChangeDetectionStrategy, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ContactService } from '../../../services/contact.service';
import { ContactSubmission } from '../../../models/contact.model';
import { getApiErrorMessage } from '../../../utils/api-error.util';

@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-contacts.component.html',
  styleUrl: './admin-contacts.component.css',
})
export class AdminContactsComponent {
  private readonly contactService = inject(ContactService);
  private readonly destroyRef = inject(DestroyRef);

  readonly submissions = signal<ContactSubmission[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.contactService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (items) => this.submissions.set(items),
        error: (err: unknown) => {
          this.error.set(getApiErrorMessage(err, 'Could not load contact submissions.'));
        },
      });
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleString('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
}
