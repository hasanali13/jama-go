import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult, unwrapApiResult } from '../models/api-result.model';
import { LoginRequest, LoginResponse, UserSummary } from '../models/auth.model';

const TOKEN_KEY = 'jamago_admin_token';
const USER_KEY = 'jamago_admin_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly currentUser = signal<UserSummary | null>(this.readStoredUser());

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const user = this.currentUser();
    if (!user) {
      return false;
    }

    return true;
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
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
    void this.router.navigate(['/admin/login']);
  }

  private persistSession(response: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    this.currentUser.set(response.user);
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
