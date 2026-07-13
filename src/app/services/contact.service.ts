import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactSubmission, CreateContactRequest } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  submit(request: CreateContactRequest): Observable<ContactSubmission> {
    return this.http.post<ContactSubmission>(`${environment.apiUrl}/contacts`, request);
  }
}
