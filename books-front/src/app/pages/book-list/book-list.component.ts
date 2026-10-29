import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BookService } from 'src/app/core/services/book.service';
import { AuthorService } from 'src/app/core/services/author.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Book, PaginatedBooks } from 'src/app/types/book';
import { Author } from 'src/app/types/author.model';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { SearchComponent } from 'src/app/shared/search/search.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent, SearchComponent],
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 10;

  searchTerm = '';
  selectedAuthor = '';

  books: Book[] = [];
  authors: string[] = [];

  totalItems = 0;
  totalPages = 0;

  loading = false;
  errorMessage = '';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadAuthors();
    this.loadBooks();
  }

  loadAuthors(): void {
    this.authorService.getAuthors().subscribe({
      next: (response: { data: Author[] }) => {
        this.authors = response.data.map((author) => author.name);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur chargement auteurs:', error.message);
      },
    });
  }

  loadBooks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookService
      .getBooks({
        page: this.currentPage,
        search: this.searchTerm,
        author: this.selectedAuthor,
      })
      .subscribe({
        next: (response: PaginatedBooks) => {
          this.books = response.data;
          this.currentPage = response.meta.current_page;
          this.itemsPerPage = response.meta.per_page;
          this.totalItems = response.meta.total;
          this.totalPages = response.meta.last_page;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage =
            error.error?.message ?? 'Impossible de charger les livres.';
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBooks();
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.currentPage = 1;
    this.loadBooks();
  }

  onAuthorChange(value: string): void {
    this.selectedAuthor = value;
    this.currentPage = 1;
    this.loadBooks();
  }


}
