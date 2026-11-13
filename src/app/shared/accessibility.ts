import { Injectable, computed, effect, signal } from '@angular/core';

/** Visitor-chosen display options. Each option maps to a class on <html> (see _accessibility.scss). */
export interface AccessibilitySettings {
  /** 0 = normal, 1 = large, 2 = extra large */
  textSize: 0 | 1 | 2;
  highContrast: boolean;
  highlightLinks: boolean;
  readableText: boolean;
  stopAnimations: boolean;
  largeCursor: boolean;
}

const DEFAULTS: AccessibilitySettings = {
  textSize: 0,
  highContrast: false,
  highlightLinks: false,
  readableText: false,
  stopAnimations: false,
  largeCursor: false
};

const STORAGE_KEY = 'nmtc-accessibility';

/** Class added to <html> for each on/off option. */
const CLASSES: Record<Exclude<keyof AccessibilitySettings, 'textSize'>, string> = {
  highContrast: 'a11y-contrast',
  highlightLinks: 'a11y-links',
  readableText: 'a11y-readable',
  stopAnimations: 'a11y-no-motion',
  largeCursor: 'a11y-cursor'
};

@Injectable({ providedIn: 'root' })
export class AccessibilityService {
  private readonly state = signal<AccessibilitySettings>(this.load());
  readonly settings = this.state.asReadonly();

  private readonly systemReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** True when the visitor asked for less motion, here or in their device settings. */
  readonly reduceMotion = computed(() => this.state().stopAnimations || this.systemReducedMotion);

  /** True when any option differs from the default. */
  readonly isCustomised = computed(() => JSON.stringify(this.state()) !== JSON.stringify(DEFAULTS));

  constructor() {
    effect(() => {
      const s = this.state();
      this.apply(s);
      this.save(s);
    });
  }

  update(changes: Partial<AccessibilitySettings>): void {
    this.state.update((s) => ({ ...s, ...changes }));
  }

  toggle(option: keyof typeof CLASSES): void {
    this.state.update((s) => ({ ...s, [option]: !s[option] }));
  }

  reset(): void {
    this.state.set({ ...DEFAULTS });
  }

  private apply(s: AccessibilitySettings): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement.classList;
    root.remove('a11y-text-1', 'a11y-text-2');
    if (s.textSize > 0) root.add(`a11y-text-${s.textSize}`);
    for (const [option, cls] of Object.entries(CLASSES)) {
      root.toggle(cls, s[option as keyof typeof CLASSES]);
    }
  }

  // Storage can be unavailable (private browsing, blocked cookies); the panel still works for the visit.
  private load(): AccessibilitySettings {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : { ...DEFAULTS };
    } catch {
      return { ...DEFAULTS };
    }
  }

  private save(s: AccessibilitySettings): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }
}
