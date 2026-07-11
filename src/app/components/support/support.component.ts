import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './support.component.html',
})
export class SupportComponent {
  readonly supportItems = [
    {
      title: '24/7 Help Desk',
      text: 'Reach our operations team any time for urgent site issues or patrol updates.',
    },
    {
      title: 'Account Support',
      text: 'Your dedicated account manager handles reporting, scheduling, and contract changes.',
    },
    {
      title: 'Technical Assistance',
      text: 'Get help with CCTV, access control, alarms, and monitoring setup or troubleshooting.',
    },
  ];
}
