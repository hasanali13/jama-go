import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [src]="src"
      alt="JAMA Security Equipment"
      [class]="'brand-logo brand-logo--' + variant"
      width="130"
      height="130"
      decoding="async"
    />
  `,
})
export class LogoComponent {
  @Input() variant: 'header' | 'footer' = 'header';
  src = '/JamaGoLogo.png';
}
