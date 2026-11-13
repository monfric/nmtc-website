import { Component, DestroyRef, ElementRef, HostListener, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Footer } from './layout/footer';
import { Header } from './layout/header';
import { AccessibilityPanel } from './shared/accessibility-panel';
import { RouteLoader } from './shared/route-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, AccessibilityPanel, RouteLoader],
  templateUrl: './app.html'
})
export class App {
  protected readonly progress = signal(0);
  protected readonly showBackToTop = signal(false);

  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    // After moving to another page, put keyboard and screen-reader focus at the start of
    // the new content (otherwise it stays on the link that was clicked in the old page).
    // Skipped for the page the visitor arrived on (navigation id 1) and for links to a
    // section on the same page (#anchor).
    const router = inject(Router);
    const sub = router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (e.id === 1 || e.urlAfterRedirects.includes('#')) return;
        setTimeout(() => this.main().nativeElement.focus({ preventScroll: true }));
      });
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());

    afterNextRender(() => hideStartupScreen());
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    this.showBackToTop.set(window.scrollY > 600);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Removes the start-up screen from index.html once the site is ready.
 * Production builds load the main stylesheet in the background (media="print" until loaded),
 * so on a slow connection wait for it too; otherwise visitors would briefly see an unstyled page.
 */
function hideStartupScreen(): void {
  const splash = document.querySelector<HTMLElement>('.boot-splash');
  if (!splash) return;

  const hide = () => {
    splash.classList.add('is-hidden');
    setTimeout(() => splash.remove(), 400);
  };

  const pending = [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][media="print"]')];
  if (pending.length === 0) {
    hide();
    return;
  }
  let remaining = pending.length;
  const done = () => --remaining === 0 && hide();
  pending.forEach((link) => {
    link.addEventListener('load', done, { once: true });
    link.addEventListener('error', done, { once: true });
  });
}
