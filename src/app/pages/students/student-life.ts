import { Component } from '@angular/core';
import { EXTERNAL_LINKS, IMAGES } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-student-life',
  imports: [PageHeader, RevealDirective, CtaBand],
  templateUrl: './student-life.html'
})
export class StudentLife {
  protected readonly images = IMAGES;

  protected readonly resources = [
    { icon: 'bi-person-badge', title: 'Student Portal', text: 'Results, fee statements, unit registration and timetables.', href: EXTERNAL_LINKS.studentPortal },
    { icon: 'bi-laptop', title: 'E-Learning', text: 'Lecture notes, assignments, quizzes and recorded lessons.', href: EXTERNAL_LINKS.eLearning },
    { icon: 'bi-book', title: 'Library', text: 'Medical texts, journals, e-books and quiet study spaces.', href: EXTERNAL_LINKS.library }
  ];

  protected readonly pillars = [
    { icon: 'bi-house-door', title: 'Accommodation', text: 'Safe, secure on-campus hostels with study rooms, Wi-Fi and 24-hour security.' },
    { icon: 'bi-chat-heart', title: 'Counselling & Wellness', text: 'Confidential counselling, peer mentorship and health services for every student.' },
    { icon: 'bi-trophy', title: 'Sports & Recreation', text: 'Football, volleyball, basketball, athletics and an annual inter-college games week.' },
    { icon: 'bi-people', title: 'Clubs & Societies', text: 'Red Cross, debating, drama, YCS & Christian unions, environment and research clubs.' },
    { icon: 'bi-megaphone', title: 'Student Council', text: 'An elected council that represents student interests in college governance.' },
    { icon: 'bi-globe-americas', title: 'Community Outreach', text: 'Medical camps, health education and volunteer programs in local communities.' }
  ];

  protected readonly gallery = [
    { image: IMAGES.students, caption: 'Group study sessions', wide: true },
    { image: IMAGES.skillsLab, caption: 'Skills laboratory practice', wide: false },
    { image: IMAGES.friends, caption: 'Friendships for life', wide: false },
    { image: IMAGES.library, caption: 'The college library', wide: false },
    { image: IMAGES.sunset, caption: 'Outdoor activities', wide: true }
  ];
}
