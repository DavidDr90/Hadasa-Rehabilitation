import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Category } from '../../models/Category';
import { Phrase } from '../../models/Phrase';

import * as Enums from '../../consts/enums';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-phrases',
  templateUrl: 'phrases.html'
})
export class PhrasesPage {

  public parentCategory: Category;
  public phrases;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public phrasesProvider: PhrasesProvider,
    public modalCtrl: ModalController,
    private _actionSheetCtrl: ActionSheetController,
    public categoryService: CategoryServiceProvider,
    public aAuth: AngularFireAuth,

  ) {
    //get the parent category object from the clickable category.
    this.parentCategory = navParams.get('parentCategory');
    this.AsyncPhrasesloader();
  }


  //handler that add phrase and update the display 
  public addPhrase(phrase: Phrase) {
    setTimeout(() => {
      this.phrasesProvider.addPhrase(phrase);
      this.AsyncPhrasesloader()
    }, 500)
  }

  //handler that remove phrase and update the display 
  public removePhrase(phrase: Phrase) {
    setTimeout(() => {
      this.phrasesProvider.removePhrase(phrase);
      this.AsyncPhrasesloader()
    }, 500)
  }

  //initial phrases array for ngFor
  //promise is an Promise object that gets the return value only when its ready (await)
  // from phrase provider.
  //temp is an promise object that help to get the phrases from promis's resolve attr.
  public AsyncPhrasesloader() {
    let promise = this.phrasesProvider.getPhrases(this.parentCategory);
    promise.then((data) => {
      this.phrases = data;
    })
  }


  /**present Action Sheet when press the add button
   * let the user choose what he wants to add
   * the user have three options:
   * 1. add new sub-category
   * 2. add new phrase
   */
  presentActionSheet() {
    let actionSheet = this._actionSheetCtrl.create({
      title: 'בחר מה להוסיף',
      buttons: [
        {
          text: '\xa0\xa0 הוספת ביטוי',
          icon: 'camera',
          handler: () => {
            this.openAddPage(Enums.ADD_OPTIONS.PHRASE);
          }
        },
        {
          text: '\xa0\xa0 הוספת תת-קטגוריה',
          icon: 'images',
          handler: () => {
            this.openAddPage(Enums.ADD_OPTIONS.CATEGORY);
          }
        },
        {
          text: 'ביטול',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }


  /**display the addPhrasePage and get the retrun object from the form.
  * Prompt the user to add a new phrase. This shows our AddPhrasePage in a
  * modal and then adds the new item to our data source if the user created one.
  */
  openAddPage(fromWhere) {
    let addModal = this.modalCtrl.create('AddPhrasePage',
      { 'fromWhere': fromWhere, 'categoryName': this.parentCategory.id });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form

        if (fromWhere == Enums.ADD_OPTIONS.PHRASE) {
          //create new phrase from the output form
          let newPhrase =
            new Phrase("", item.text, item.imagePath, item.categoryID, 0, item.audioFile, false);
          this.addPhrase(newPhrase);//upload the new phase to the DB and refresh the screen
        } else if (fromWhere == Enums.ADD_OPTIONS.CATEGORY) {
          let newSubCategory =
          new Category(item.text, "", item.imagePath, this.aAuth.auth.currentUser.email, item.categoryID, 0, false);
          this.categoryService.addCategory(newSubCategory);

        }
      }
    })
    addModal.present();//present the addPhrasePage
  }

  //TODO: enter edit mode
  edit() {
    console.log("edit phrase");
  }

}
