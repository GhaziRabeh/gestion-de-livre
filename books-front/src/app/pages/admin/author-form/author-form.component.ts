import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthorService } from 'src/app/core/services/author.service';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css'],
})
export class AuthorFormComponent implements OnInit {
  authorForm;
  loading = false;
  errorMessage = '';
  authorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.authorId = Number(id);
      this.loadAuthor(this.authorId);
    }
  }

  loadAuthor(id: number): void {
    this.authorService.getAuthor(id).subscribe({
      next: (response) => {
        this.authorForm.patchValue({
          name: response.data.name,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage =
          error.error?.message ?? 'Impossible de charger l’auteur.';
      },
    });
  }

  onSubmit(): void {
    if (this.authorForm.invalid || this.loading) {
      this.authorForm.markAllAsTouched();
      return;
    }

    const value = this.authorForm.getRawValue();

    this.loading = true;
    this.errorMessage = '';

    const data = { name: value.name ?? '' };

    const request = this.authorId
      ? this.authorService.updateAuthor(this.authorId, data)
      : this.authorService.createAuthor(data);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/authors']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;

        this.errorMessage =
          error.error?.message ?? 'Erreur lors de l’enregistrement de l’auteur.';
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/authors']);
  }
}
