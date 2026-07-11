import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  readonly serviceOptions = [
    'Manned Guarding',
    'Mobile Patrols',
    'Event Security',
    'CCTV Monitoring',
    'Residential Security',
    'Alarm Response',
  ];

  sent = false;

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (this.sent) return;
    const form = event.target as HTMLFormElement;
    form.reset();
    this.sent = true;
    setTimeout(() => (this.sent = false), 3500);
  }
}
