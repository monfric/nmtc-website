import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { INSTITUTION, MAIN_NAV, NavItem, TOP_NAV } from '../data/site';
import { Crest } from '../shared/crest';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Crest],
  templateUrl: './header.html',
  host: { class: 'site-header', '[class.is-scrolled]': 'scrolled()' }
})
export class Header {
  protected readonly institution = INSTITUTION;
  protected readonly topNav = TOP_NAV;
  protected readonly mainNav = MAIN_NAV;

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  private readonly url = signal('/');

  constructor() {
    const router = inject(Router);
    const sub = router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.url.set(e.urlAfterRedirects);
        this.menuOpen.set(false);
      });
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 60);
  }

  protected isSectionActive(item: NavItem): boolean {
    return !!item.base && this.url().startsWith(item.base);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
