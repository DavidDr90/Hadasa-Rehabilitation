import { Component, Input } from '@angular/core';
import { Phrase } from "../../models/Phrase"
import { PhrasePopupPage } from '../../pages/phrase-popup/phrase-popup';
import { NavController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { HomePage } from '../../pages/home/home';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { ErrorProvider } from '../../providers/error/error';
import * as Enums from '../../consts/enums';


@Component({
  selector: 'phrase',
  templateUrl: 'phrase.html'
})

export class PhraseComponent {

  @Input() phrase: Phrase;
  @Input() editMode: boolean;
  favProvider: FavoriteProvider;
  constructor(
    public navCtrl: NavController,
    private errorProvider: ErrorProvider,
    private phraseProvider: PhrasesProvider,
    public error:ErrorProvider) {
    this.favProvider = new FavoriteProvider(HomePage.favClass);

  }

  /*open the phrase popup page and pass to it
   current phrase , image, audio*/
   //ignore in editMode
  public openPopup(event) {
    if(this.editMode){
      console.log("phrase popup ignored in edit mode");
      this.errorProvider.simpleTosat("לא ניתן ללחוץ על ביטוי במצב עריכה");
      return;
    }

    event.stopPropagation();
    /**on click method when the user click on a phrase
     * the method check if to add the phrase to the common phrases list.*/
    this.phraseProvider.increaseViews(this.phrase);//update DB
    this.favProvider.addCommonFavPhrases(this.phrase);
    try {
      this.navCtrl.push(PhrasePopupPage, {
        phraseName: this.phrase.name,
        phraseImageURL: this.phrase.imageURL,
        phraseAudioURL: this.phrase.audio
      });
    }
    catch (error) {
      this.errorProvider.simpleTosat("לא הצלחנו לפתוח את החלון");
      console.log(error);
    }

  }

  /** update isFav when the user try to add/remove phrase from favoriets.
   * update the DB also.
   * if in edit mode ignore
   */
  public updateIsFav(event) {
    if(this.editMode){
      console.log("phrase updateisfav ignored in edit mode");
      return;
    }
    event.stopPropagation();
    this.phrase as Phrase;
    if (this.phrase.isFav == false) {
      let flag = this.favProvider.add_fav_phrase(this.phrase)//add phrase from favorite
      //the list is full. cannot add.
      if (flag == -1){
        this.error.simpleTosat("you cant choose more then "+Enums.NUM_FAVORITES_PHRASES+"favorite phrases")
        return;
      }
      this.phrase.isFav = true;
    }
    else {
      this.favProvider.remove_fav_phrases(this.phrase)//remove phrase from favorite
      this.phrase.isFav = false;
    }
    this.phraseProvider.setIsFav(this.phrase, this.phrase.isFav)//update the DB
  }



}
