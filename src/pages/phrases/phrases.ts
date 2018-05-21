import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import * as Enums from '../../consts/enums';

const PHRASE = 2;

@IonicPage()
@Component({
  selector: 'page-phrases',
  templateUrl: 'phrases.html'
})
export class PhrasesPage {
  categoryName: string;
  phrases;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider: PhrasesProvider,
    public modalCtrl: ModalController) {
    this.phrases = provider.GetPhrases();
    this.categoryName = provider.GetCategoryName();
  }

  /**display the addPhrasePage and get the retrun object from the form.
  * Prompt the user to add a new phrase. This shows our AddPhrasePage in a
  * modal and then adds the new item to our data source if the user created one.
  */
  openAddPage() {
    let addModal = this.modalCtrl.create('AddPhrasePage',
    { 'fromWhere': Enums.ADD_OPTIONS.PHRASE, 'categoryName': this.categoryName });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form
        console.log(item);
        //TOOD: here we should upload the 'item' to the DB using Or & Dor firebaseProvider
      }
    })
    addModal.present();//present the addPhrasePage
  }

}
