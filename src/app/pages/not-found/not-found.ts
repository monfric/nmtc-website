import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="section not-found">
      <div class="container text-center">
        <span class="not-found-code">404</span>
        <h1 class="section-title">Page Not Found</h1>
        <p class="text-body-secondary mb-4">The page you are looking for may have been moved or no longer exists.</p>
        <div class="d-flex flex-wrap gap-3 justify-content-center">
          <a class="btn btn-primary btn-lg" routerLink="/">Back to Home</a>
          <a class="btn btn-outline-primary btn-lg" routerLink="/contact">Contact Us</a>
        </div>
      </div>
    </section>
  `
})
export class NotFound {}
