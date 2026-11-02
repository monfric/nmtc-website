import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXTERNAL_LINKS, INSTITUTION } from '../data/site';
import { Crest } from '../shared/crest';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Crest],
  templateUrl: './footer.html'
})
export class Footer {
  protected readonly institution = INSTITUTION;
  protected readonly links = EXTERNAL_LINKS;
  protected readonly year = new Date().getFullYear();
}
