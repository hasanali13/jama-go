import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const isLoginRequest = req.url.includes('/auth/login');
  const token = isLoginRequest ? null : auth.getToken();

  const authedRequest = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authedRequest).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !isLoginRequest
      ) {
        auth.handleUnauthorized();
      } else if (
        error instanceof HttpErrorResponse &&
        error.status === 403 &&
        !isLoginRequest
      ) {
        auth.handleForbidden();
      }

      return throwError(() => error);
    }),
  );
};
