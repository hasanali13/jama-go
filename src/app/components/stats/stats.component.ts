import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './stats.component.html',
})
export class StatsComponent {
  readonly stats = [
    { num: '500+', label: 'Sites protected' },
    { num: '<15m', label: 'Avg. response' },
    { num: '99.9%', label: 'Uptime coverage' },
    { num: '24/7', label: 'Always on guard' },
  ];
}
