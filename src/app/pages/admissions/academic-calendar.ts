import { Component, signal } from '@angular/core';
import { IMAGES } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

interface CalendarEntry {
  activity: string;
  date: string;
}

@Component({
  selector: 'app-academic-calendar',
  imports: [PageHeader, RevealDirective, CtaBand],
  templateUrl: './academic-calendar.html'
})
export class AcademicCalendar {
  protected readonly images = IMAGES;
  protected readonly activeTab = signal(0);

  protected readonly semesters: { title: string; period: string; entries: CalendarEntry[] }[] = [
    {
      title: 'Semester I',
      period: 'September 2026 – December 2026',
      entries: [
        { activity: 'Reporting and registration of new students', date: '7 – 11 Sep 2026' },
        { activity: 'Orientation week for first-year students', date: '14 – 18 Sep 2026' },
        { activity: 'Commencement of classes', date: '21 Sep 2026' },
        { activity: 'Continuous assessment tests (CATs)', date: '26 – 30 Oct 2026' },
        { activity: 'Open day and campus tour', date: '14 Nov 2026' },
        { activity: 'End of semester examinations', date: '27 Nov – 11 Dec 2026' },
        { activity: '26th Graduation Ceremony', date: '4 Dec 2026' },
        { activity: 'Semester break', date: '12 Dec 2026 – 10 Jan 2027' }
      ]
    },
    {
      title: 'Semester II',
      period: 'January 2027 – April 2027',
      entries: [
        { activity: 'Reporting of continuing students and January intake', date: '11 – 15 Jan 2027' },
        { activity: 'Commencement of classes', date: '18 Jan 2027' },
        { activity: 'Clinical placement rotations begin', date: '1 Feb 2027' },
        { activity: 'Continuous assessment tests (CATs)', date: '22 – 26 Feb 2027' },
        { activity: 'Annual sports and cultural week', date: '15 – 19 Mar 2027' },
        { activity: 'End of semester examinations', date: '5 – 16 Apr 2027' },
        { activity: 'Semester break', date: '17 Apr – 2 May 2027' }
      ]
    },
    {
      title: 'Semester III',
      period: 'May 2027 – August 2027',
      entries: [
        { activity: 'Reporting of continuing students and May intake', date: '3 – 7 May 2027' },
        { activity: 'Commencement of classes', date: '10 May 2027' },
        { activity: 'Continuous assessment tests (CATs)', date: '14 – 18 Jun 2027' },
        { activity: 'Health sciences research week', date: '12 – 16 Jul 2027' },
        { activity: 'End of semester and final qualifying examinations', date: '2 – 13 Aug 2027' },
        { activity: 'Long vacation', date: '14 Aug – 5 Sep 2027' }
      ]
    }
  ];

  protected readonly intakes = [
    { month: 'January', deadline: 'Applications close 30 November', programs: 'Diploma & certificate programs' },
    { month: 'May', deadline: 'Applications close 31 March', programs: 'Selected programs' },
    { month: 'September', deadline: 'Applications close 31 July', programs: 'All programs' }
  ];
}
