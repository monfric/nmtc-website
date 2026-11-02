import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

export type RevealEffect = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade' | '';

type RevealCallback = () => void;

const callbacks = new WeakMap<Element, RevealCallback>();
let observer: IntersectionObserver | undefined;

/** One observer shared by every revealed element on the page. */
function sharedObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callbacks.get(entry.target)?.();
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  return observer;
}

/**
 * Animates an element into view the first time it scrolls into the viewport.
 * Usage: `<div appReveal="left" [revealDelay]="200">`
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnInit, OnDestroy {
  readonly appReveal = input<RevealEffect>('up');
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  ngOnInit(): void {
    this.el.classList.add('reveal', `reveal-${this.appReveal() || 'up'}`);
    this.el.style.setProperty('--reveal-delay', `${this.revealDelay()}ms`);

    if (typeof IntersectionObserver === 'undefined') {
      this.el.classList.add('is-visible');
      return;
    }
    callbacks.set(this.el, () => this.el.classList.add('is-visible'));
    sharedObserver().observe(this.el);
  }

  ngOnDestroy(): void {
    callbacks.delete(this.el);
    observer?.unobserve(this.el);
  }
}
