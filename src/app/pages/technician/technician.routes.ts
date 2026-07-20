import { Routes } from '@angular/router';

export const TECHNICIAN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/technician-layout.component').then((m) => m.TechnicianLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Technician Dashboard — Jama Go',
        loadComponent: () =>
          import('./dashboard/technician-dashboard.component').then((m) => m.TechnicianDashboardComponent),
      },
      {
        path: 'dia/:id',
        title: 'DIA Inspection — Jama Go',
        loadComponent: () =>
          import('./detail/technician-dia-detail.component').then((m) => m.TechnicianDiaDetailComponent),
      },
      {
        path: 'inspection/:id',
        title: 'Inspection Form — Jama Go',
        loadComponent: () =>
          import('./form/technician-inspection-form.component').then((m) => m.TechnicianInspectionFormComponent),
      },
      {
        path: 'inspection/:id/review',
        title: 'Review Inspection — Jama Go',
        loadComponent: () =>
          import('./review/technician-inspection-review.component').then((m) => m.TechnicianInspectionReviewComponent),
      },
      {
        path: 'dia/:id/summary',
        title: 'Final Summary — Jama Go',
        loadComponent: () =>
          import('./summary/technician-final-summary.component').then((m) => m.TechnicianFinalSummaryComponent),
      },
    ],
  },
];

export default TECHNICIAN_ROUTES;
