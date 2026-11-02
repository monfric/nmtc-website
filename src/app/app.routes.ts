import { Routes } from '@angular/router';
import { INSTITUTION } from './data/site';

const title = (page: string) => `${page} | ${INSTITUTION.shortName}`;

export const routes: Routes = [
  {
    path: '',
    title: `${INSTITUTION.name} | ${INSTITUTION.shortName}`,
    loadComponent: () => import('./pages/home/home').then((m) => m.Home)
  },
  {
    path: 'about',
    children: [
      { path: '', redirectTo: 'vision-mission', pathMatch: 'full' },
      {
        path: 'vision-mission',
        title: title('Vision & Mission'),
        loadComponent: () => import('./pages/about/vision-mission').then((m) => m.VisionMission)
      },
      {
        path: 'history',
        title: title('History of NMTC'),
        loadComponent: () => import('./pages/about/history').then((m) => m.History)
      },
      {
        path: 'affiliate-institutions',
        title: title('Affiliate Institutions'),
        loadComponent: () => import('./pages/about/affiliates').then((m) => m.Affiliates)
      }
    ]
  },
  {
    path: 'admissions',
    children: [
      { path: '', redirectTo: 'admission-process', pathMatch: 'full' },
      {
        path: 'admission-process',
        title: title('Admission Process'),
        loadComponent: () => import('./pages/admissions/admission-process').then((m) => m.AdmissionProcess)
      },
      {
        path: 'academic-calendars',
        title: title('Academic Calendars'),
        loadComponent: () => import('./pages/admissions/academic-calendar').then((m) => m.AcademicCalendar)
      }
    ]
  },
  {
    path: 'academics',
    children: [
      { path: '', redirectTo: 'diploma-programs', pathMatch: 'full' },
      {
        path: 'diploma-programs',
        title: title('Diploma Programs'),
        data: { level: 'diploma' },
        loadComponent: () => import('./pages/academics/programs').then((m) => m.Programs)
      },
      {
        path: 'certificate-programs',
        title: title('Certificate Programs'),
        data: { level: 'certificate' },
        loadComponent: () => import('./pages/academics/programs').then((m) => m.Programs)
      },
      {
        path: 'short-courses',
        title: title('Short Courses'),
        data: { level: 'short' },
        loadComponent: () => import('./pages/academics/programs').then((m) => m.Programs)
      }
    ]
  },
  {
    path: 'students',
    children: [
      { path: '', redirectTo: 'student-life', pathMatch: 'full' },
      {
        path: 'student-life',
        title: title('Student Life'),
        loadComponent: () => import('./pages/students/student-life').then((m) => m.StudentLife)
      },
      {
        path: 'graduation-ceremony',
        title: title('Graduation Ceremony'),
        loadComponent: () => import('./pages/students/graduation').then((m) => m.Graduation)
      }
    ]
  },
  {
    path: 'careers',
    title: title('Careers'),
    loadComponent: () => import('./pages/careers/careers').then((m) => m.Careers)
  },
  {
    path: 'contact',
    title: title('Contact Us'),
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact)
  },
  {
    path: '**',
    title: title('Page Not Found'),
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound)
  }
];
