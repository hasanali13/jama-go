import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult, unwrapApiResult } from '../models/api-result.model';
import {
  InspectionInvoice,
  PaginatedData,
  SaveTechnicianDraftRequest,
  TechnicianDiaDetail,
  TechnicianDiaListItem,
  TechnicianFinalSummary,
  TechnicianInspection,
  TechnicianInspectionHistory,
} from '../models/technician.model';

@Injectable({ providedIn: 'root' })
export class TechnicianService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/technician`;

  getActivatedDiaList(): Observable<TechnicianDiaListItem[]> {
    return this.http
      .get<ApiResult<TechnicianDiaListItem[]>>(`${this.baseUrl}/dia`)
      .pipe(map(unwrapApiResult));
  }

  getInspectionById(id: string): Observable<TechnicianInspection> {
    return this.http
      .get<ApiResult<TechnicianInspection>>(`${this.baseUrl}/inspection/${id}`)
      .pipe(map(unwrapApiResult));
  }

  getDiaById(id: string): Observable<TechnicianDiaDetail> {
    return this.http
      .get<ApiResult<TechnicianDiaDetail>>(`${this.baseUrl}/dia/${id}`)
      .pipe(map(unwrapApiResult));
  }

  getFinalSummary(id: string): Observable<TechnicianFinalSummary> {
    return this.http
      .get<ApiResult<TechnicianFinalSummary>>(`${this.baseUrl}/dia/${id}/summary`)
      .pipe(map(unwrapApiResult));
  }

  startInspection(diaInspectionId: string): Observable<TechnicianInspection> {
    return this.http
      .post<ApiResult<TechnicianInspection>>(`${this.baseUrl}/start`, { diaInspectionId })
      .pipe(map(unwrapApiResult));
  }

  saveDraft(request: SaveTechnicianDraftRequest): Observable<TechnicianInspection> {
    return this.http
      .post<ApiResult<TechnicianInspection>>(`${this.baseUrl}/save-draft`, request)
      .pipe(map(unwrapApiResult));
  }

  submitInspection(inspectionId: string): Observable<TechnicianInspection> {
    return this.http
      .post<ApiResult<TechnicianInspection>>(`${this.baseUrl}/submit`, { inspectionId })
      .pipe(map(unwrapApiResult));
  }

  getHistory(diaId?: string, pageNumber = 1, pageSize = 20): Observable<PaginatedData<TechnicianInspectionHistory>> {
    let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    if (diaId) params = params.set('diaId', diaId);
    return this.http
      .get<ApiResult<PaginatedData<TechnicianInspectionHistory>>>(`${this.baseUrl}/history`, { params })
      .pipe(map(unwrapApiResult));
  }

  getInvoices(diaId?: string): Observable<InspectionInvoice[]> {
    let params = new HttpParams();
    if (diaId) params = params.set('diaId', diaId);
    return this.http
      .get<ApiResult<InspectionInvoice[]>>(`${this.baseUrl}/invoices`, { params })
      .pipe(map(unwrapApiResult));
  }
}
