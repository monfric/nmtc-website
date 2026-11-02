import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Carousel } from 'bootstrap';
import {
  AFFILIATES,
  EVENTS,
  EXTERNAL_LINKS,
  IMAGES,
  INSTITUTION,
  NEWS,
  PROGRAMS,
  STATS,
  TESTIMONIALS
} from '../../data/site';
import { CounterDirective } from '../../shared/counter.directive';
import { CtaBand } from '../../shared/cta-band';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe, RevealDirective, CounterDirective, CtaBand],
  templateUrl: './home.html'
})
export class Home implements AfterViewInit, OnDestroy {
  protected readonly institution = INSTITUTION;
  protected readonly links = EXTERNAL_LINKS;
  protected readonly images = IMAGES;
  protected readonly stats = STATS;
  protected readonly news = NEWS;
  protected readonly events = EVENTS;
  protected readonly testimonials = TESTIMONIALS;
  protected readonly programs = PROGRAMS.filter((p) => p.level === 'diploma').slice(0, 6);
  protected readonly partners = AFFILIATES.flatMap((a) => a.items.map((name) => ({ name, icon: a.icon }))).slice(0, 10);

  protected readonly slides = [
    {
      image: IMAGES.campus,
      eyebrow: `Excellence in Health Professions Education since ${INSTITUTION.founded}`,
      title: 'Shaping Compassionate, Competent Healthcare Professionals',
      text: 'Accredited diploma, certificate and short courses that prepare you for licensure and a lifetime of service.'
    },
    {
      image: IMAGES.lab,
      eyebrow: 'Learning by Doing',
      title: 'Modern Laboratories & Clinical Skills Training',
      text: 'Hands-on training in fully equipped laboratories and a high-fidelity simulation centre.'
    },
    {
      image: IMAGES.imaging,
      eyebrow: 'Clinical Placements',
      title: 'Learn Alongside Experienced Practitioners',
      text: 'Supervised placements across more than 35 teaching, referral and community health facilities.'
    }
  ];

  protected readonly quickLinks = [
    { icon: 'bi-mortarboard', title: 'Our Programs', text: 'Diplomas, certificates and CPD courses.', route: '/academics/diploma-programs' },
    { icon: 'bi-clipboard-check', title: 'How to Apply', text: 'Requirements and admission steps.', route: '/admissions/admission-process' },
    { icon: 'bi-laptop', title: 'E-Learning', text: 'Access course materials online.', href: EXTERNAL_LINKS.eLearning },
    { icon: 'bi-book', title: 'Library', text: 'Print and digital learning resources.', href: EXTERNAL_LINKS.library }
  ];

  protected readonly features = [
    { icon: 'bi-patch-check', title: 'Accredited Programs', text: `All programs are approved by ${INSTITUTION.regulator} and relevant professional boards.` },
    { icon: 'bi-hospital', title: 'Clinical Exposure', text: 'Structured placements in leading teaching and referral hospitals from the first year.' },
    { icon: 'bi-person-video3', title: 'Experienced Faculty', text: 'Lecturers who are active clinicians, researchers and mentors.' },
    { icon: 'bi-cpu', title: 'Simulation Centre', text: 'High-fidelity manikins and mock wards for safe, repeated practice.' },
    { icon: 'bi-journal-medical', title: 'Library & E-Resources', text: 'Extensive medical texts, journals and online databases.' },
    { icon: 'bi-heart', title: 'Student Support', text: 'Mentorship, counselling, sports and a vibrant campus community.' }
  ];

  protected readonly steps = [
    { icon: 'bi-search', title: 'Choose a Program', text: 'Explore our programs and confirm the entry requirements.' },
    { icon: 'bi-pencil-square', title: 'Apply Online', text: 'Complete the application form on the Application Portal.' },
    { icon: 'bi-file-earmark-check', title: 'Receive Your Offer', text: 'Successful applicants receive an admission letter by email.' },
    { icon: 'bi-door-open', title: 'Report & Register', text: 'Report on the stated date with your documents and fees.' }
  ];

  private readonly heroCarousel = viewChild<ElementRef<HTMLElement>>('heroCarousel');
  private readonly testimonialCarousel = viewChild<ElementRef<HTMLElement>>('testimonialCarousel');
  private carousels: Carousel[] = [];

  ngAfterViewInit(): void {
    // Bootstrap only auto-starts carousels present at page load, so start them explicitly.
    const hero = this.heroCarousel()?.nativeElement;
    const testimonials = this.testimonialCarousel()?.nativeElement;
    if (hero) this.carousels.push(new Carousel(hero, { interval: 7000, ride: 'carousel', pause: false }));
    if (testimonials) this.carousels.push(new Carousel(testimonials, { interval: 6000, ride: 'carousel' }));
  }

  ngOnDestroy(): void {
    this.carousels.forEach((c) => c.dispose());
  }
}
