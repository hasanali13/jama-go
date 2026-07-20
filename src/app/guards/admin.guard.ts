import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    auth.clearSession();
    return router.createUrlTree(['/admin/login']);
  }

  return auth.validateSession().pipe(
    map((user) =>
      user.role === 'Admin' ? true : router.createUrlTree([auth.landingRoute(user)]),
    ),
    catchError(() => of(router.createUrlTree(['/admin/login']))),
  );
};

export const staffGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    auth.clearSession();
    return router.createUrlTree(['/admin/login']);
  }

  return auth.validateSession().pipe(
    map((user) =>
      user.role === 'Staff' ? true : router.createUrlTree([auth.landingRoute(user)]),
    ),
    catchError(() => of(router.createUrlTree(['/admin/login']))),
  );
};

export const technicianGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    auth.clearSession();
    return router.createUrlTree(['/admin/login']);
  }

  return auth.validateSession().pipe(
    map((user) =>
      user.role === 'Technician' ? true : router.createUrlTree([auth.landingRoute(user)]),
    ),
    catchError(() => of(router.createUrlTree(['/admin/login']))),
  );
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree([auth.landingRoute()]);
};
