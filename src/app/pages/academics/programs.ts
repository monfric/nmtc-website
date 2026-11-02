import { Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EXTERNAL_LINKS, INSTITUTION, PROGRAM_LEVELS, PROGRAMS, ProgramLevel } from '../../data/site';
import { CtaBand } from '../../shared/cta-band';
import { PageHeader } from '../../shared/page-header';
import { RevealDirective } from '../../shared/reveal.directive';

/** Lists the programs for one level; the level comes from the route's `data`. */
@Component({
  selector: 'app-programs',
  imports: [PageHeader, RevealDirective, RouterLink, RouterLinkActive, CtaBand],
  templateUrl: './programs.html'
})
export class Programs {
  readonly level = input.required<ProgramLevel>();

  protected readonly institution = INSTITUTION;
  protected readonly links = EXTERNAL_LINKS;
  protected readonly levels = (Object.keys(PROGRAM_LEVELS) as ProgramLevel[]).map((key) => ({
    key,
    ...PROGRAM_LEVELS[key],
    count: PROGRAMS.filter((p) => p.level === key).length
  }));

  protected readonly meta = computed(() => PROGRAM_LEVELS[this.level()]);
  protected readonly programs = computed(() => PROGRAMS.filter((p) => p.level === this.level()));
}
