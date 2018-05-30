import { Component, Input } from '@angular/core';
import { Phrase } from "../../models/Phrase"
import { PhrasePopupPage } from '../../pages/phrase-popup/phrase-popup';
import { NavController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'phrase',
  templateUrl: 'phrase.html'
})

export class PhraseComponent {

  @Input() phrase : Phrase;
  favProvider:FavoriteProvider;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    this.favProvider = new FavoriteProvider(HomePage.favClass);
  }
  
  /*open the phrase popup page and pass to it
   current phrase , image, audio*/
  public openPopup(){
    

  /**on click method when the user click on a phrase
   * the method check if to add the phrase to the common phrases list.*/
    this.phrase.views++;
    this.favProvider.addCommonFavPhrases(this.phrase);
  
    try{
      this.navCtrl.push(PhrasePopupPage, {
        phraseName: this.phrase.name,//this.phrase.getName(),
        phraseImageURL: this.phrase.imageURL,
        phraseAudioURL: this.phrase.audio
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
