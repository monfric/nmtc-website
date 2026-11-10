import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXTERNAL_LINKS, IMAGES, INSTITUTION } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-admission-process',
  imports: [PageHeader, RevealDirective, RouterLink, CtaBand],
  templateUrl: './admission-process.html'
})
export class AdmissionProcess {
  protected readonly institution = INSTITUTION;
  protected readonly images = IMAGES;
  protected readonly links = EXTERNAL_LINKS;

  protected readonly steps = [
    {
      title: 'Choose Your Program',
      text: 'Browse our diploma, certificate and short course offerings and confirm that you meet the minimum entry requirements for your chosen program.'
    },
    {
      title: 'Create an Account & Apply Online',
      text: 'Register on the Application Portal, complete the application form and upload scanned copies of your academic certificates and identification documents.'
    },
    {
      title: 'Pay the Application Fee',
      text: 'Pay the non-refundable application fee using the payment options provided on the portal and upload proof of payment.'
    },
    {
      title: 'Application Review',
      text: 'The Admissions Board reviews all applications against entry requirements and available capacity. Some programs may require an interview.'
    },
    {
      title: 'Receive Your Admission Letter',
      text: 'Successful applicants are notified by email and SMS and can download their admission letter, fee structure and joining instructions from the portal.'
    },
    {
      title: 'Report & Register',
      text: 'Report to the college on the stated date with original documents, a medical examination form and evidence of fee payment to complete registration.'
    }
  ];

  protected readonly documents = [
    'Original and copies of secondary school certificate / result slip',
    'Copy of national ID card or birth certificate',
    'Two recent passport-size photographs',
  ];

  protected readonly faqs = [
    {
      q: 'When are the intakes?',
      a: 'Most programs admit students in January and September, with selected programs also admitting in May. See the Academic Calendar for exact dates.'
    },
    {
      q: 'Can I apply if I am still awaiting my results?',
      a: 'Yes. You may submit a provisional application and upload your results once they are released. Admission is confirmed only after verification.'
    },
    {
      q: 'Are there scholarships or financial aid?',
      a: 'Eligible students may apply for government loans, bursaries and college merit scholarships. Contact the Student Affairs office for guidance.'
    },
    {
      q: 'Is accommodation available?',
      a: 'Limited on-campus accommodation is available on a first-come, first-served basis. Accredited off-campus hostels are also recommended.'
    },
    {
      q: 'Do you accept international students?',
      a: 'Yes. International applicants must have their qualifications evaluated by the relevant national qualifications authority before admission.'
    }
  ];
}
