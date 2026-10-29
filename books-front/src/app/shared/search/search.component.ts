import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Input() authors: string[] = [];
  @Input() searchTerm = '';
  @Input() selectedAuthor = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() authorChange = new EventEmitter<string>();
}