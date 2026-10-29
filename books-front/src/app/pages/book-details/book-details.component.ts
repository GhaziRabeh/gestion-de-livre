import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BookService } from '../../core/services/book.service';
import { Book } from '../../types/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || Number.isNaN(id)) {
      this.error = 'Identifiant du livre introuvable.';
      this.loading = false;
      return;
    }

    this.bookService.getBook(id).subscribe({
      next: (response) => {
        console.log('Book API response:', response);
        this.book = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Book API error:', err);
        this.error = 'Impossible de charger les détails du livre.';
        this.loading = false;
      },
    });
  }
}
