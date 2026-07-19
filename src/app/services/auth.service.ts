import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult, unwrapApiResult } from '../models/api-result.model';
import { LoginRequest, LoginResponse, UserSummary } from '../models/auth.model';

const TOKEN_KEY = 'jamago_admin_token';
const USER_KEY = 'jamago_admin_user';
const EXPIRES_KEY = 'jamago_admin_expires';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly currentUser = signal<UserSummary | null>(null);

  constructor() {
    this.restoreSession();
  }

  getToken(): string | null {
    if (this.isSessionExpired()) {
      this.clearSession();
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUser();
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<ApiResult<LoginResponse>>(`${environment.apiUrl}/auth/login`, request)
      .pipe(
        map((result) => unwrapApiResult(result)),
        tap((response) => this.persistSession(response)),
      );
  }

  logout(): void {
    this.clearSession();
    void this.router.navigate(['/admin/login']);
  }

  /** Clears an invalid/expired session. Redirects only when already in admin. */
  handleUnauthorized(): void {
    const onAdmin = this.router.url.startsWith('/admin');
    this.clearSession();

    if (onAdmin && !this.router.url.startsWith('/admin/login')) {
      void this.router.navigate(['/admin/login']);
    }
  }

  private restoreSession(): void {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = this.readStoredUser();

    if (!token || !user || this.isSessionExpired()) {
      this.clearSession();
      return;
    }

    this.currentUser.set(user);
  }

  private persistSession(response: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));

    if (response.expiresAtUtc) {
      localStorage.setItem(EXPIRES_KEY, response.expiresAtUtc);
    } else {
      localStorage.removeItem(EXPIRES_KEY);
    }

    this.currentUser.set(response.user);
  }

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    this.currentUser.set(null);
  }

  private isSessionExpired(): boolean {
    const expiresAt = localStorage.getItem(EXPIRES_KEY);
    if (!expiresAt) {
      // No client-side expiry — rely on API 401 handling.
      return false;
    }

    const expiresMs = Date.parse(expiresAt);
    if (Number.isNaN(expiresMs)) {
      return true;
    }

    // Small skew buffer so we don't send a token that expires mid-request.
    return Date.now() >= expiresMs - 30_000;
  }

  private readStoredUser(): UserSummary | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as UserSummary;
    } catch {
      return null;
    }
  }
}
