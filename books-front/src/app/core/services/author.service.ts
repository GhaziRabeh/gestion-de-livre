import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Author } from '../../types/author.model';
import { API_CONFIG } from '../config/api.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private readonly apiUrl = `${API_CONFIG.baseUrl}/authors`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  // Public: liste des auteurs, même sans login
  getAuthors(): Observable<{ data: Author[] }> {
    return this.http.get<{ data: Author[] }>(this.apiUrl);
  }

  // Admin/authenticated requests
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });
  }

  getAuthor(id: number): Observable<{ data: Author }> {
    return this.http.get<{ data: Author }>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createAuthor(data: Partial<Author>): Observable<{ data: Author }> {
    return this.http.post<{ data: Author }>(this.apiUrl, data, {
      headers: this.getHeaders(),
    });
  }

  updateAuthor(
    id: number,
    data: Partial<Author>,
  ): Observable<{ data: Author }> {
    return this.http.put<{ data: Author }>(`${this.apiUrl}/${id}`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteAuthor(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
