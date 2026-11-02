import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { INSTITUTION, MAIN_NAV, TOP_NAV } from './data/site';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the institution brand', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-name')?.textContent).toContain(INSTITUTION.shortName);
  });

  it('should render every top and main navigation tab', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const topLabels = Array.from(compiled.querySelectorAll('.topbar-links a')).map((a) => a.textContent?.trim());
    const mainLabels = Array.from(compiled.querySelectorAll('.navbar-nav > li > a')).map((a) => a.textContent?.trim());
    expect(topLabels).toEqual(TOP_NAV.map((l) => l.label));
    expect(mainLabels).toEqual(MAIN_NAV.map((l) => l.label));
  });
});
