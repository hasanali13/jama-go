import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-trust-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="trust-bar">
      <div class="container trust-inner">
        <span>Trusted by teams across</span>
        <div class="logos">
          @for (sector of sectors; track sector) {
            <span>{{ sector }}</span>
          }
        </div>
      </div>
    </div>
  `,
})
export class TrustBarComponent {
  readonly sectors = ['Retail', 'Corporate', 'Construction', 'Events', 'Residential'];
}
