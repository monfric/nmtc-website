import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Counts up from zero to the target value once the element scrolls into view. */
@Directive({ selector: '[appCounter]' })
export class CounterDirective implements OnInit, OnDestroy {
  readonly appCounter = input.required<number>();
  readonly counterSuffix = input('');
  readonly counterDuration = input(2200);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private observer?: IntersectionObserver;
  private frame = 0;

  ngOnInit(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.render(this.appCounter());
      return;
    }
    this.render(0);
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.observer?.disconnect();
          this.animate();
        }
      },
      { threshold: 0.5 }
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }

  private animate(): void {
    const target = this.appCounter();
    const duration = this.counterDuration();
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.render(Math.round(target * eased));
      if (progress < 1) this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }

  private render(value: number): void {
    this.el.textContent = value.toLocaleString() + this.counterSuffix();
  }
}
