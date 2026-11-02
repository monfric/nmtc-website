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
    { icon: 'bi-shield-check', title: 'Integrity', text: 'We uphold honesty, transparency and ethical conduct in all we do.' },
    { icon: 'bi-heart-pulse', title: 'Compassion', text: 'We place patients, communities and human dignity at the heart of care.' },
    { icon: 'bi-trophy', title: 'Excellence', text: 'We pursue the highest standards in teaching, learning and service.' },
    { icon: 'bi-person-badge', title: 'Professionalism', text: 'We model accountability, respect and commitment to our professions.' },
    { icon: 'bi-lightbulb', title: 'Innovation', text: 'We embrace research, technology and new ideas that improve health.' },
    { icon: 'bi-people', title: 'Teamwork', text: 'We collaborate across disciplines, institutions and communities.' }
  ];

  protected readonly objectives = [
    'Offer accredited, competency-based programs that respond to national and global health needs.',
    'Provide quality clinical training through strong partnerships with teaching and referral hospitals.',
    'Promote research, innovation and evidence-based practice among staff and students.',
    'Develop graduates with the ethics, leadership and communication skills required in healthcare.',
    'Engage communities through outreach, health education and continuing professional development.'
  ];
}
