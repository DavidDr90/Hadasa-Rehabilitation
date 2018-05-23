import { Component, Input } from '@angular/core';
import { Phrase } from "../../models/Phrase"
import { PhrasePopupPage } from '../../pages/phrase-popup/phrase-popup';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'phrase',
  templateUrl: 'phrase.html'
})

export class PhraseComponent {

  @Input() phrase : Phrase;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
  }

  /*open the phrase popup page and pass to it
   current phrase , image, audio*/
  public openPopup(){

    try{
      this.navCtrl.push(PhrasePopupPage, {
        phraseName: this.phrase.name,//this.phrase.getName(),
        phraseImageURL: this.phrase.imageURL,
        phraseAudioURL: this.phrase.gGetAudio()
        //this.phrase.getImageURL(), 
        //TODO add audio to phrase model and pass it here 
        //phraseAudioURL: "this.phrase.GetAudioURL"     
      });
    }
    catch(error){

        let alert = this.alertCtrl.create({
          title: 'cannot open phrase popup',
          subTitle: error,
          buttons: ['sorry']
        });
        alert.present();

    }

}

}
