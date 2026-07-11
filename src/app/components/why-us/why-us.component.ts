import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './why-us.component.html',
})
export class WhyUsComponent {
  readonly reasons = [
    'Fully licensed, insured and accredited officers',
    'Real-time incident reporting to your inbox',
    'Dedicated account manager for every client',
    'Flexible contracts with no hidden fees',
  ];
}
