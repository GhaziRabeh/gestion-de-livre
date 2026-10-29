import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { BookService } from 'src/app/core/services/book.service';
import { AuthorService } from 'src/app/core/services/author.service';
import { Author } from 'src/app/types/author.model';

interface AuthorsResponse {
  data: Author[];
}

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  bookForm;
  selectedImage: File | null = null;
  authors: Author[] = [];
  loading = false;
  errorMessage = '';
  bookId: number | null = null;
  currentImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      image: new FormControl<File | null>(null),
      year: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe({
      next: (response: AuthorsResponse) => {
        this.authors = response.data;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage =
          error.error?.message ?? 'Impossible de charger les auteurs.';
      },
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = Number(id);
      this.loadBook(this.bookId);
    }
  }

  loadBook(id: number): void {
    this.bookService.getBook(id).subscribe({
      next: (response) => {
        const book = response.data;

        this.bookForm.patchValue({
          title: book.title,
          author: String(book.author.id),
          year: String(book.year),
        });

        this.currentImage = book.image;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage =
          error.error?.message ?? 'Impossible de charger le livre.';
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.selectedImage = input.files?.[0] ?? null;

    this.bookForm.patchValue({
      image: this.selectedImage,
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid || this.loading) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const value = this.bookForm.getRawValue();
    const formData = new FormData();

    formData.append('title', value.title ?? '');
    formData.append('author_id', String(value.author ?? ''));
    formData.append('year', String(value.year ?? ''));

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.loading = true;
    this.errorMessage = '';

    const request = this.bookId
      ? this.bookService.updateBook(this.bookId, formData)
      : this.bookService.createBook(formData);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/books']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;

        this.errorMessage =
          error.error?.message ?? 'Erreur lors de l’enregistrement du livre.';
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/books']);
  }
}
