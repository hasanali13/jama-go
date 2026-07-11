import { Component, ChangeDetectionStrategy } from '@angular/core';

interface MonitorRow {
  label: string;
  value: string;
  tone: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  readonly monitorRows: MonitorRow[] = [
    { label: 'Perimeter — North Gate', value: 'Clear', tone: 'ok' },
    { label: 'Patrol Unit 04', value: 'On Route', tone: 'ok' },
    { label: 'CCTV Grid', value: '32 / 32', tone: 'ok' },
    { label: 'Alarm Response', value: 'Armed', tone: 'warn' },
  ];
}
