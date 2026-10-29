import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { BookListComponent } from './pages/book-list/book-list.component';
// import { FooterComponent } from './shared/footer/footer.component';
// import { NavbarComponent } from './shared/navbar/navbar.component';
// import { BookFormComponent } from './pages/admin/book-form/book-form.component';
// import { BookDetailsComponent } from './pages/book-details/book-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    // NavbarComponent,
    // FooterComponent,
    // BookListComponent,
    // BookFormComponent,
    // BookDetailsComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'books-front';
}