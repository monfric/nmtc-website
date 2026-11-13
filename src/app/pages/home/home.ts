import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, WritableSignal, effect, inject, signal, untracked, viewChild } from '@angular/core';
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
import { AccessibilityService } from '../../shared/accessibility';
import { CounterDirective } from '../../shared/counter.directive';
import { CtaBand } from '../../shared/cta-band';
import { RevealDirective } from '../../shared/reveal.directive';

type SliderName = 'hero' | 'testimonials';

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
  private readonly carousels: Partial<Record<SliderName, Carousel>> = {};
  private readonly intervals: Record<SliderName, number> = { hero: 7000, testimonials: 6000 };

  /** Sliders start paused for visitors who asked for reduced motion (device setting or accessibility panel). */
  private readonly a11y = inject(AccessibilityService);
  private readonly reduceMotion = this.a11y.reduceMotion();
  protected readonly playing: Record<SliderName, WritableSignal<boolean>> = {
    hero: signal(!this.reduceMotion),
    testimonials: signal(!this.reduceMotion)
  };

  protected readonly marqueePlaying = signal(!this.reduceMotion);

  constructor() {
    // Turning "Stop animations" on or off in the accessibility panel pauses or resumes every slider.
    let first = true;
    effect(() => {
      const still = this.a11y.reduceMotion();
      if (first) {
        first = false;
        return;
      }
      untracked(() => {
        this.marqueePlaying.set(!still);
        (['hero', 'testimonials'] as const).forEach((name) => {
          this.playing[name].set(!still);
          this.startSlider(name);
        });
      });
    });
  }

  ngAfterViewInit(): void {
    // Bootstrap only auto-starts carousels present at page load, so start them explicitly.
    this.startSlider('hero');
    this.startSlider('testimonials');
  }

  /** Pause or resume a slider (required so moving content can be stopped, WCAG 2.2.2). */
  protected togglePlay(name: SliderName): void {
    this.playing[name].update((on) => !on);
    this.startSlider(name);
  }

  // Bootstrap restarts a slider after hover or arrow clicks whenever `ride` is set,
  // so a paused slider is rebuilt with `ride: false` to keep it truly paused.
  private startSlider(name: SliderName): void {
    const el = (name === 'hero' ? this.heroCarousel() : this.testimonialCarousel())?.nativeElement;
    if (!el) return;
    this.carousels[name]?.dispose();
    this.carousels[name] = new Carousel(el, {
      interval: this.intervals[name],
      ride: this.playing[name]() ? 'carousel' : false,
      pause: 'hover'
    });
  }

  ngOnDestroy(): void {
    Object.values(this.carousels).forEach((c) => c?.dispose());
  }
}
