import { Component, input } from '@angular/core';

/** The NMTC shield crest used in the header, footer and favicon. */
@Component({
  selector: 'app-crest',
  template: `
    <svg viewBox="0 0 48 56" [attr.width]="size()" [attr.height]="size() * 56 / 48" aria-hidden="true">
      <path d="M24 2 44 9v18c0 13-9 22-20 27C13 49 4 40 4 27V9Z" fill="#0a5c36" stroke="#c9a227" stroke-width="2.5" />
      <path d="M24 7.5 39.5 13v14c0 10-7 17.5-15.5 21.8C15.5 44.5 8.5 37 8.5 27V13Z" fill="none" stroke="#ffffff" stroke-opacity=".35" />
      <path d="M20 14h8v8h8v8h-8v12h-8V30h-8v-8h8Z" fill="#ffffff" />
    </svg>
  `,
  host: { class: 'd-inline-flex' }
})
export class Crest {
  readonly size = input(44);
}
