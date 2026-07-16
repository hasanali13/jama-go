import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { ContactSubmission } from '../../../models/contact.model';

@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-contacts.component.html',
  styleUrl: './admin-contacts.component.css',
})
export class AdminContactsComponent {
  private readonly contactService = inject(ContactService);

  readonly submissions = signal<ContactSubmission[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.contactService.getAll().subscribe({
      next: (items) => {
        this.submissions.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load contact submissions.');
        this.loading.set(false);
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
