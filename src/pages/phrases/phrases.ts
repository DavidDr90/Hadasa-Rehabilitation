import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';

@IonicPage()
@Component({
  selector: 'page-phrases',
  templateUrl: 'phrases.html'
})
export class PhrasesPage {
  phraseName: string;
  phrases;
  constructor(public navCtrl: NavController, public navParams: NavParams, provider: PhrasesProvider) 
  {
    this.phrases = provider.GetPhrases();
    this.phraseName = provider.GetPhraseName();
  }

}
