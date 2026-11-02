import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXTERNAL_LINKS, IMAGES } from '../data/site';
import { RevealDirective } from './reveal.directive';

/** Closing call-to-action band used at the bottom of most pages. */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="cta-band parallax" [style.background-image]="'url(' + image + ')'">
      <div class="container position-relative text-center text-white">
        <span class="eyebrow eyebrow-light justify-content-center" appReveal="fade">Admissions Open</span>
        <h2 class="display-5 mb-3" appReveal [revealDelay]="100">{{ heading() }}</h2>
        <p class="lead mx-auto mb-4 cta-band-text" appReveal [revealDelay]="200">{{ text() }}</p>
        <div class="d-flex flex-wrap gap-3 justify-content-center" appReveal="zoom" [revealDelay]="300">
          <a class="btn btn-accent btn-lg" [attr.href]="applyHref">
            <i class="bi bi-pencil-square me-2"></i>Apply Now
          </a>
          <a class="btn btn-outline-light btn-lg" routerLink="/contact">
            <i class="bi bi-chat-dots me-2"></i>Talk to Admissions
          </a>
        </div>
      </div>
    </section>
  `
})
export class CtaBand {
  readonly heading = input('Begin Your Journey in Healthcare');
  readonly text = input(
    'Join a community dedicated to excellence in health professions education. Applications for the January 2027 intake are now open.'
  );

  protected readonly applyHref = EXTERNAL_LINKS.applicationPortal;
  protected readonly image = IMAGES.surgeons;
}
