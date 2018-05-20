import { Component, Input } from '@angular/core';
import { Phrase } from "../../models/Phrase"
import { PhrasePopupPage } from '../../pages/phrase-popup/phrase-popup';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'phrase',
  templateUrl: 'phrase.html'
})

export class PhraseComponent {

  @Input() phrase : Phrase;

  constructor(public navCtrl: NavController) {
  }

  public openPopup(){
    this.navCtrl.push(PhrasePopupPage);
}

}
