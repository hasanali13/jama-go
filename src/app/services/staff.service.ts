import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult, unwrapApiResult } from '../models/api-result.model';
import {
  CreateStaffRequest,
  StaffMember,
  UpdateStaffRequest,
} from '../models/staff.model';

@Injectable({ providedIn: 'root' })
export class StaffService {
  private readonly http = inject(HttpClient);

  getActive(): Observable<StaffMember[]> {
    return this.http
      .get<ApiResult<StaffMember[]>>(`${environment.apiUrl}/staff`)
      .pipe(map((result) => unwrapApiResult(result)));
  }

  getAll(): Observable<StaffMember[]> {
    return this.http
      .get<ApiResult<StaffMember[]>>(`${environment.apiUrl}/staff/all`)
      .pipe(map((result) => unwrapApiResult(result)));
  }

  getById(id: string): Observable<StaffMember> {
    return this.http
      .get<ApiResult<StaffMember>>(`${environment.apiUrl}/staff/${id}`)
      .pipe(map((result) => unwrapApiResult(result)));
  }

  create(request: CreateStaffRequest): Observable<string> {
    return this.http
      .post<ApiResult<string>>(`${environment.apiUrl}/staff`, request)
      .pipe(map((result) => unwrapApiResult(result)));
  }

  update(id: string, request: UpdateStaffRequest): Observable<string> {
    return this.http
      .put<ApiResult<string>>(`${environment.apiUrl}/staff/${id}`, { ...request, id })
      .pipe(map((result) => unwrapApiResult(result)));
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete<ApiResult<string>>(`${environment.apiUrl}/staff/${id}`)
      .pipe(map((result) => unwrapApiResult(result)));
  }
}
