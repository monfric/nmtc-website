import { Component } from '@angular/core';
import { HISTORY, IMAGES, INSTITUTION } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-history',
  imports: [PageHeader, RevealDirective, CtaBand],
  templateUrl: './history.html'
})
export class History {
  protected readonly institution = INSTITUTION;
  protected readonly images = IMAGES;
  protected readonly milestones = HISTORY;
}
