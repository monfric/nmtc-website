import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AFFILIATES, IMAGES } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-affiliates',
  imports: [PageHeader, RevealDirective, RouterLink, CtaBand],
  templateUrl: './affiliates.html'
})
export class Affiliates {
  protected readonly images = IMAGES;
  protected readonly affiliates = AFFILIATES;

  protected readonly benefits = [
    { icon: 'bi-hospital', title: 'Clinical Placements', text: 'Students rotate through accredited wards, laboratories, pharmacies and imaging departments.' },
    { icon: 'bi-arrow-up-right-circle', title: 'Progression Pathways', text: 'Graduates can progress to degree programs with credit transfer at partner universities.' },
    { icon: 'bi-journal-text', title: 'Research Collaboration', text: 'Joint research projects, symposia and publications with partner institutions.' },
    { icon: 'bi-arrow-left-right', title: 'Faculty Exchange', text: 'Staff development and exchange programs that keep teaching current.' }
  ];
}
