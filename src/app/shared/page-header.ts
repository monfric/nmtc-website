import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Crumb {
  label: string;
  route?: string;
}

/** Full-width banner shown at the top of every inner page. */
@Component({
  selector: 'app-page-header',
  imports: [RouterLink],
  template: `
    <section class="page-header">
      <div class="page-header-bg" [style.background-image]="'url(' + image() + ')'"></div>
      <div class="container position-relative">
        <nav aria-label="breadcrumb" class="page-header-crumbs">
          <ol class="breadcrumb mb-3">
            <li class="breadcrumb-item"><a routerLink="/"><i class="bi bi-house-door me-1"></i>Home</a></li>
            @for (crumb of crumbs(); track crumb.label) {
              <li class="breadcrumb-item">
                @if (crumb.route) {
                  <a [routerLink]="crumb.route">{{ crumb.label }}</a>
                } @else {
                  {{ crumb.label }}
                }
              </li>
            }
            <li class="breadcrumb-item active" aria-current="page">{{ title() }}</li>
          </ol>
        </nav>
        <h1 class="page-header-title">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="page-header-subtitle">{{ subtitle() }}</p>
        }
      </div>
    </section>
  `
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly image = input.required<string>();
  readonly crumbs = input<Crumb[]>([]);
}
