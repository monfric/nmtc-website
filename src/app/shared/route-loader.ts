import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

type LoaderState = 'idle' | 'loading' | 'done';

/** Only show the bar when a page takes longer than this, so fast clicks don't flicker. */
const SHOW_AFTER_MS = 150;

/**
 * Thin bar across the top of the screen while the next page loads,
 * plus a screen-reader announcement ("Loading page…", then the new page's name).
 */
@Component({
  selector: 'app-route-loader',
  template: `
    <div class="route-loader" [class.is-loading]="state() === 'loading'" [class.is-done]="state() === 'done'"
      aria-hidden="true"></div>
    <div class="visually-hidden" role="status" aria-live="polite">{{ announcement() }}</div>
  `
})
export class RouteLoader {
  protected readonly state = signal<LoaderState>('idle');
  protected readonly announcement = signal('');

  private showTimer?: ReturnType<typeof setTimeout>;
  private hideTimer?: ReturnType<typeof setTimeout>;
  private firstNavigation = true;

  constructor() {
    const sub = inject(Router).events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.start();
      } else if (event instanceof NavigationEnd) {
        this.finish(true);
      } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
        this.finish(false);
      }
    });
    inject(DestroyRef).onDestroy(() => {
      sub.unsubscribe();
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
    });
  }

  private start(): void {
    clearTimeout(this.showTimer);
    clearTimeout(this.hideTimer);
    // The first page is covered by the start-up screen in index.html.
    if (this.firstNavigation) return;

    this.state.set('idle');
    this.showTimer = setTimeout(() => {
      this.state.set('loading');
      this.announcement.set('Loading page…');
    }, SHOW_AFTER_MS);
  }

  private finish(succeeded: boolean): void {
    clearTimeout(this.showTimer);
    const wasFirst = this.firstNavigation;
    this.firstNavigation = false;

    if (succeeded && !wasFirst) {
      // The router sets the new page title on NavigationEnd; read it once it has.
      setTimeout(() => this.announcement.set(`${document.title.split(' | ')[0]} page loaded`));
    } else if (!succeeded) {
      this.announcement.set('');
    }

    if (this.state() === 'loading') {
      this.state.set('done');
      this.hideTimer = setTimeout(() => this.state.set('idle'), 600);
    } else {
      this.state.set('idle');
    }
  }
}
