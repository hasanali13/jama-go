import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './our-team.component.html',
})
export class OurTeamComponent {
  readonly team = [
    {
      name: 'Operations Lead',
      role: 'Field Operations',
      bio: 'Oversees manned guarding, patrol routes, and on-site incident response.',
    },
    {
      name: 'Client Success Manager',
      role: 'Account Management',
      bio: 'Your main point of contact for reporting, scheduling, and service planning.',
    },
    {
      name: 'Technical Supervisor',
      role: 'Systems & Monitoring',
      bio: 'Leads CCTV, access control, and alarm monitoring across client sites.',
    },
  ];
}
