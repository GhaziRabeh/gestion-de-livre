import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from 'src/app/types/author.model';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent],
  templateUrl: './author-list.component.html',
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;

  get filteredAuthors(): Author[] {
    return this.authors.filter((author) =>
      author.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  get paginatedAuthors(): Author[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredAuthors.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAuthors.length / this.itemsPerPage);
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  constructor(
    private authorService: AuthorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authorService.getAuthors().subscribe({
      next: (response) => {
        this.authors = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error?.message ?? 'Impossible de charger les auteurs.';
      },
    });
  }

  addAuthor(): void {
    this.router.navigate(['/admin/authors/new']);
  }

  editAuthor(id: number): void {
    this.router.navigate(['/admin/authors', id, 'edit']);
  }

  deleteAuthor(author: Author): void {
    const confirmed = confirm(
      `Voulez-vous vraiment supprimer l'auteur "${author.name}" ?`,
    );

    if (!confirmed) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.authorService.deleteAuthor(author.id).subscribe({
      next: () => {
        this.authors = this.authors.filter((a) => a.id !== author.id);
        this.successMessage = 'Auteur supprimé avec succès.';
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message ?? 'Impossible de supprimer cet auteur.';
      },
    });
  }
}
