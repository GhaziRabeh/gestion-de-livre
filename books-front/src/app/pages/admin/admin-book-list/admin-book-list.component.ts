import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { BookService } from '../../../core/services/book.service';
import { AuthorService } from '../../../core/services/author.service';
import { Book } from '../../../types/book';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { SearchComponent } from '../../../shared/search/search.component';

@Component({
  selector: 'app-admin-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent, SearchComponent],
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css'],
})
export class AdminBookListComponent implements OnInit {
  books: Book[] = [];
  authors: string[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  deletingBookId: number | null = null;

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;

  searchTerm = '';
  selectedAuthor = '';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) {}

  ngOnInit(): void {
    this.loadAuthors();
    this.loadBooks();
  }

  loadAuthors(): void {
    this.authorService.getAuthors().subscribe({
      next: (response) => {
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
        next: (response) => {
          this.books = response.data;
          this.currentPage = response.meta.current_page;
          this.itemsPerPage = response.meta.per_page;
          this.totalItems = response.meta.total;
          this.totalPages = response.meta.last_page;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur chargement livres:', error);
          this.errorMessage =
            error.error?.message ?? 'Impossible de charger les livres.';
          this.loading = false;
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

  deleteBook(id: number): void {
    const confirmed = confirm(
      'Voulez-vous vraiment supprimer ce livre ?',
    );

    if (!confirmed || this.deletingBookId !== null) {
      return;
    }

    this.deletingBookId = id;
    this.errorMessage = '';
    this.successMessage = '';

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter((book) => book.id !== id);
        this.successMessage = 'Livre supprimé avec succès.';
        this.deletingBookId = null;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur suppression livre:', error);

        this.errorMessage =
          error.error?.message ?? 'Impossible de supprimer ce livre.';

        this.deletingBookId = null;
      },
    });
  }
}
