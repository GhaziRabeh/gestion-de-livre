import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Book, PaginatedBooks } from 'src/app/types/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiUrl = `${API_CONFIG.baseUrl}/books`;

  constructor(private http: HttpClient) {}

  getBooks(filters?: {
    page?: number;
    search?: string;
    author?: string;
  }): Observable<PaginatedBooks> {
    let params = new HttpParams();

    if (filters?.page) {
      params = params.set('page', filters.page);
    }

    if (filters?.search?.trim()) {
      params = params.set('search', filters.search.trim());
    }

    if (filters?.author?.trim()) {
      params = params.set('author', filters.author.trim());
    }

    return this.http.get<PaginatedBooks>(this.apiUrl, { params });
  }

  getBook(id: number): Observable<{ data: Book }> {
    return this.http.get<{ data: Book }>(`${this.apiUrl}/${id}`);
  }

  createBook(data: FormData): Observable<{ data: Book }> {
    return this.http.post<{ data: Book }>(this.apiUrl, data);
  }

  updateBook(id: number, data: FormData): Observable<{ data: Book }> {
    data.set('_method', 'PUT');

    return this.http.post<{ data: Book }>(`${this.apiUrl}/${id}`, data);
  }

  deleteBook(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
