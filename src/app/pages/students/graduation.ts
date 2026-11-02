import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXTERNAL_LINKS, GRADUATION_DATE, IMAGES } from '../../data/site';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-graduation',
  imports: [PageHeader, RevealDirective, RouterLink, DatePipe],
  templateUrl: './graduation.html'
})
export class Graduation implements OnInit, OnDestroy {
  protected readonly images = IMAGES;
  protected readonly links = EXTERNAL_LINKS;
  protected readonly ceremonyDate = GRADUATION_DATE;
  protected readonly countdown = signal<{ label: string; value: number }[]>([]);

  private timer?: ReturnType<typeof setInterval>;

  protected readonly checklist = [
    { title: 'Complete Clearance', text: 'Obtain clearance from Finance, Library, Hostels and your academic department through the Student Portal.' },
    { title: 'Confirm Attendance', text: 'Confirm whether you will graduate in person or in absentia by the stated deadline.' },
    { title: 'Collect Your Gown', text: 'Collect your academic gown and hood from the Registrar’s office during the gown issue week.' },
    { title: 'Attend Rehearsal', text: 'Attend the mandatory rehearsal held two days before the ceremony.' },
    { title: 'Graduate!', text: 'Celebrate with family and friends as you are conferred your award.' }
  ];

  protected readonly info = [
    { icon: 'bi-geo-alt', title: 'Venue', text: 'College Grounds, Main Campus' },
    { icon: 'bi-clock', title: 'Arrival', text: 'Graduands by 7:00 am, guests seated by 8:30 am' },
    { icon: 'bi-people', title: 'Guests', text: 'Each graduand may bring up to two guests' },
    { icon: 'bi-person-standing-dress', title: 'Dress Code', text: 'Official academic regalia over formal attire' }
  ];

  ngOnInit(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  private tick(): void {
    const remaining = Math.max(new Date(this.ceremonyDate).getTime() - Date.now(), 0);
    const seconds = Math.floor(remaining / 1000);
    this.countdown.set([
      { label: 'Days', value: Math.floor(seconds / 86400) },
      { label: 'Hours', value: Math.floor((seconds % 86400) / 3600) },
      { label: 'Minutes', value: Math.floor((seconds % 3600) / 60) },
      { label: 'Seconds', value: seconds % 60 }
    ]);
  }
}
