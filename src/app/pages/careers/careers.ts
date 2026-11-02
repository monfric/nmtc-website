import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { IMAGES, INSTITUTION, VACANCIES } from '../../data/site';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-careers',
  imports: [PageHeader, RevealDirective, DatePipe],
  templateUrl: './careers.html'
})
export class Careers {
  protected readonly institution = INSTITUTION;
  protected readonly images = IMAGES;
  protected readonly vacancies = VACANCIES;

  protected readonly perks = [
    { icon: 'bi-graph-up-arrow', title: 'Professional Growth', text: 'Sponsored training, conferences and further studies.' },
    { icon: 'bi-shield-plus', title: 'Comprehensive Benefits', text: 'Medical cover, pension scheme and competitive remuneration.' },
    { icon: 'bi-people', title: 'Collegial Culture', text: 'Work with dedicated educators, clinicians and support staff.' },
    { icon: 'bi-stars', title: 'Meaningful Impact', text: 'Shape the next generation of healthcare professionals.' }
  ];

  protected applyHref(title: string): string {
    return `mailto:${INSTITUTION.careersEmail}?subject=${encodeURIComponent('Application: ' + title)}`;
  }
}
