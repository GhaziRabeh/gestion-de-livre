import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { GoogleCallbackComponent } from './pages/login/google-callback.component';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Google OAuth callback
  {
    path: 'auth/callback',
    component: GoogleCallbackComponent,
  },

  // Public layout
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },

      // Books: public list and filters
      {
        path: 'books',
        loadComponent: () =>
          import('./pages/book-list/book-list.component').then(
            (m) => m.BookListComponent,
          ),
      },

      // Book details: connected users and admins only
      {
        path: 'books/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/book-details/book-details.component').then(
            (m) => m.BookDetailsComponent,
          ),
      },

      // Authentication
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./pages/verify-email/verify-email.component').then(
            (m) => m.VerifyEmailComponent,
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent,
          ),
      },
      {
        path: 'reset-password-otp',
        loadComponent: () =>
          import(
            './pages/reset-password-otp/reset-password-otp.component'
          ).then((m) => m.ResetPasswordOtpComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent,
          ),
      },
    ],
  },

  // Admin: books and authors management
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },

      // Books CRUD
      {
        path: 'books',
        loadComponent: () =>
          import(
            './pages/admin/admin-book-list/admin-book-list.component'
          ).then((m) => m.AdminBookListComponent),
      },
      {
        path: 'books/new',
        loadComponent: () =>
          import('./pages/admin/book-form/book-form.component').then(
            (m) => m.BookFormComponent,
          ),
      },
      {
        path: 'books/:id/edit',
        loadComponent: () =>
          import('./pages/admin/book-form/book-form.component').then(
            (m) => m.BookFormComponent,
          ),
      },

      // Authors CRUD
      {
        path: 'authors',
        loadComponent: () =>
          import('./pages/admin/author-list/author-list.component').then(
            (m) => m.AuthorListComponent,
          ),
      },
      {
        path: 'authors/new',
        loadComponent: () =>
          import('./pages/admin/author-form/author-form.component').then(
            (m) => m.AuthorFormComponent,
          ),
      },
      {
        path: 'authors/:id/edit',
        loadComponent: () =>
          import('./pages/admin/author-form/author-form.component').then(
            (m) => m.AuthorFormComponent,
          ),
      },
    ],
  },

  // Fallback
  { path: '**', redirectTo: '' },
];