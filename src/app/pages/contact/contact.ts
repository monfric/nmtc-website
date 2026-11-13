import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMAGES, INSTITUTION } from '../../data/site';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [PageHeader, RevealDirective, ReactiveFormsModule],
  templateUrl: './contact.html'
})
export class Contact {
  protected readonly institution = INSTITUTION;
  protected readonly images = IMAGES;
  protected readonly submitted = signal(false);

  protected readonly subjects = ['Admissions enquiry', 'Programs & courses', 'Fees & finance', 'Student affairs', 'Partnerships', 'Other'];

  protected readonly departments = [
    { name: 'Admissions Office', email: INSTITUTION.admissionsEmail, icon: 'bi-person-plus' },
    { name: 'Registrar (Academic Affairs)', email: INSTITUTION.admissionsEmail, icon: 'bi-journal-check' },
    { name: 'Finance Office', email: INSTITUTION.admissionsEmail, icon: 'bi-cash-coin' },
    { name: 'Student Affairs', email: INSTITUTION.admissionsEmail, icon: 'bi-people' }
  ];

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  protected invalid(control: 'name' | 'email' | 'subject' | 'message'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit(formEl: HTMLFormElement): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      // Move the cursor to the first field that needs fixing, so keyboard and screen reader users know where to go.
      formEl.querySelector<HTMLElement>('.ng-invalid:not(form)')?.focus();
      return;
    }
    // TODO: send the enquiry to the college's backend or email service.
    this.submitted.set(true);
    this.form.reset();
  }
}
