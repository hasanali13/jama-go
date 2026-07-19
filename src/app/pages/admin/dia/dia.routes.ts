import { Routes } from '@angular/router';
import { DiaState } from './dia-state.service';

export const DIA_ROUTES: Routes = [
  {
    path: '',
    providers: [DiaState],
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'DIA Dashboard — Jama Go Admin',
        loadComponent: () =>
          import('./dashboard/dia-dashboard.component').then((module) => module.DiaDashboardComponent),
      },
      {
        path: 'list',
        title: 'DIA Inspections — Jama Go Admin',
        loadComponent: () =>
          import('./list/dia-list.component').then((module) => module.DiaListComponent),
      },
      {
        path: 'new',
        title: 'Create DIA — Jama Go Admin',
        loadComponent: () =>
          import('./form/dia-form.component').then((module) => module.DiaFormComponent),
      },
      {
        path: ':id/edit',
        title: 'Edit DIA — Jama Go Admin',
        loadComponent: () =>
          import('./form/dia-form.component').then((module) => module.DiaFormComponent),
      },
      {
        path: ':id',
        title: 'DIA Details — Jama Go Admin',
        loadComponent: () =>
          import('./detail/dia-detail.component').then((module) => module.DiaDetailComponent),
      },
    ],
  },
];

export default DIA_ROUTES;
