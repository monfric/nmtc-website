import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { AccessibilityService, AccessibilitySettings } from './accessibility';

type ToggleOption = Exclude<keyof AccessibilitySettings, 'textSize'>;

/** Floating "Accessibility" button with a panel of display options for visitors. */
@Component({
  selector: 'app-accessibility-panel',
  template: `
    <button #trigger type="button" class="a11y-trigger" (click)="toggleOpen()"
      [attr.aria-expanded]="open()" aria-controls="a11y-panel" aria-label="Accessibility options"
      [class.is-customised]="a11y.isCustomised()">
      <i class="bi bi-universal-access-circle" aria-hidden="true"></i>
    </button>

    @if (open()) {
      <div #panel id="a11y-panel" class="a11y-panel" role="dialog" aria-labelledby="a11y-panel-title" tabindex="-1">
        <div class="a11y-panel-head">
          <h2 id="a11y-panel-title"><i class="bi bi-universal-access" aria-hidden="true"></i>Accessibility</h2>
          <button type="button" class="btn-close btn-close-white" (click)="close()" aria-label="Close accessibility options"></button>
        </div>

        <div class="a11y-panel-body">
          <div class="a11y-group" role="group" aria-labelledby="a11y-text-size-label">
            <span id="a11y-text-size-label" class="a11y-group-label">Text size</span>
            <div class="a11y-sizes">
              @for (size of sizes; track size.value) {
                <button type="button" class="a11y-size" [class.is-active]="a11y.settings().textSize === size.value"
                  [attr.aria-pressed]="a11y.settings().textSize === size.value" [attr.aria-label]="size.label"
                  (click)="a11y.update({ textSize: size.value })">
                  <span [style.font-size.rem]="size.preview" aria-hidden="true">A</span>
                </button>
              }
            </div>
          </div>

          <div class="a11y-options">
            @for (option of options; track option.key) {
              <button type="button" class="a11y-option" [class.is-active]="a11y.settings()[option.key]"
                [attr.aria-pressed]="a11y.settings()[option.key]" (click)="a11y.toggle(option.key)">
                <i class="bi" [class]="option.icon" aria-hidden="true"></i>
                <span>{{ option.label }}</span>
              </button>
            }
          </div>

          <button type="button" class="btn btn-outline-primary w-100" (click)="a11y.reset()" [disabled]="!a11y.isCustomised()">
            <i class="bi bi-arrow-counterclockwise me-2" aria-hidden="true"></i>Reset to default
          </button>
          <p class="a11y-note">Your choices are saved on this device.</p>
        </div>
      </div>
    }
  `
})
export class AccessibilityPanel {
  protected readonly a11y = inject(AccessibilityService);
  protected readonly open = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  protected readonly sizes: { value: AccessibilitySettings['textSize']; label: string; preview: number }[] = [
    { value: 0, label: 'Normal text size', preview: 0.95 },
    { value: 1, label: 'Large text size', preview: 1.2 },
    { value: 2, label: 'Extra large text size', preview: 1.45 }
  ];

  protected readonly options: { key: ToggleOption; label: string; icon: string }[] = [
    { key: 'highContrast', label: 'High contrast', icon: 'bi-circle-half' },
    { key: 'highlightLinks', label: 'Highlight links', icon: 'bi-link-45deg' },
    { key: 'readableText', label: 'Dyslexia-friendly text', icon: 'bi-fonts' },
    { key: 'stopAnimations', label: 'Stop animations', icon: 'bi-pause-circle' },
    { key: 'largeCursor', label: 'Large cursor', icon: 'bi-cursor' }
  ];

  protected toggleOpen(): void {
    if (this.open()) {
      this.close();
    } else {
      this.open.set(true);
      // Move focus into the panel once it has rendered, so keyboard users land on it.
      setTimeout(() => this.panel()?.nativeElement.focus());
    }
  }

  protected close(): void {
    this.open.set(false);
    this.trigger().nativeElement.focus();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.open()) this.close();
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.host.contains(event.target as Node)) this.open.set(false);
  }
}
