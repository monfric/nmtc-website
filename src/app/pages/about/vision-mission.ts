import { Component } from '@angular/core';
import { IMAGES, INSTITUTION } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-vision-mission',
  imports: [PageHeader, RevealDirective, CtaBand],
  templateUrl: './vision-mission.html'
})
export class VisionMission {
  protected readonly institution = INSTITUTION;
  protected readonly images = IMAGES;

protected readonly values = [
  {
    icon: 'bi-universal-access',
    title: 'Equity',
    text: 'We promote fairness, inclusivity and equal opportunities for all, respecting diversity and human dignity.'
  },
  {
    icon: 'bi-clipboard-check',
    title: 'Accountability',
    text: 'We take responsibility for our actions, decisions and commitments, upholding transparency and integrity.'
  },
  {
    icon: 'bi-people',
    title: 'Teamwork',
    text: 'We foster collaboration, mutual respect and shared responsibility in achieving our institutional goals.'
  },
  {
    icon: 'bi-lightbulb',
    title: 'Creativity & Innovation',
    text: 'We encourage creative thinking, research and innovative approaches to improve healthcare education and service delivery.'
  },
  {
    icon: 'bi-person-badge',
    title: 'Professionalism',
    text: 'We uphold high standards of competence, ethical conduct, respect and commitment in all our professions.'
  },
  {
    icon: 'bi-chat-heart',
    title: 'Responsiveness',
    text: 'We respond promptly and effectively to the needs, concerns and expectations of our students, patients and communities.'
  }
];

  protected readonly objectives = [
    'Offer accredited, competency-based programs that respond to national and global health needs.',
    'Provide quality clinical training through strong partnerships with teaching and referral hospitals.',
    'Promote research, innovation and evidence-based practice among staff and students.',
    'Develop graduates with the ethics, leadership and communication skills required in healthcare.',
    'Engage communities through outreach, health education and continuing professional development.'
  ];
}
