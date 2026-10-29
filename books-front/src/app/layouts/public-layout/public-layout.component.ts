import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css']
})
export class PublicLayoutComponent {

}
