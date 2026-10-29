import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  template: '<p class="p-4">Connexion avec Google...</p>',
})
export class GoogleCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.cookieService.set('token', token, 1, '/', undefined, false, 'Lax');

    this.router.navigate(['/books']);
  }
}
