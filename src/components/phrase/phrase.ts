import { Component, Input } from '@angular/core';
import { Phrase } from "../../models/Phrase"
import { PhrasePopupPage } from '../../pages/phrase-popup/phrase-popup';
import { NavController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { HomePage } from '../../pages/home/home';
import { PhrasesProvider } from '../../providers/phrases/phrases';


@Component({
  selector: 'phrase',
  templateUrl: 'phrase.html'
})

export class PhraseComponent {

  @Input() phrase : Phrase;
  favProvider:FavoriteProvider;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private phraseProvider:PhrasesProvider) {
    this.favProvider = new FavoriteProvider(HomePage.favClass);

  }
  
  /*open the phrase popup page and pass to it
   current phrase , image, audio*/
  public openPopup(){

  /**on click method when the user click on a phrase
   * the method check if to add the phrase to the common phrases list.*/
    this.phrase.views++;
    this.phraseProvider.increaseViews(this.phrase);//update DB
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

/** update isFav when the user try to add/remove phrase from favoriets.
 * update the DB also.
 */
public updateIsFav(){
  this.phrase as Phrase;
  if(this.phrase.isFav==false){
    let flag= this.favProvider.add_fav_phrase(this.phrase)//add phrase from favorite
   //the list is full. cannot add.
    if(flag==-1)
      return;
    this.phrase.isFav=true;
  } 
  else{
    this.favProvider.remove_fav_phrases(this.phrase)//remove phrase from favorite
    this.phrase.isFav=false;
  }
  this.phraseProvider.setIsFav(this.phrase, this.phrase.isFav)//update the DB
}



}
