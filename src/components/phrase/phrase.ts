import { Component, Input } from '@angular/core';
import { Phrase } from "../../models/Phrase"

@Component({
  selector: 'phrase',
  templateUrl: 'phrase.html'
})

export class PhraseComponent {

  @Input() phrase : Phrase;

  constructor() {
    console.log('Hello PhraseComponent Component');
    
  }

}
