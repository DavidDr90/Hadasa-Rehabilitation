import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Category } from '../../models/Category';
import { Phrase } from '../../models/Phrase';

import * as Enums from '../../consts/enums';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { CategoriesPage } from '../categories/categories';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@IonicPage()
@Component({
  selector: 'page-phrases',
  templateUrl: 'phrases.html'
})
export class PhrasesPage {

  //TODO: get the backgound color from the category object
  backgroundColor = "black";

  public parentCategory: Category;
  public phrases;
  public subCategories;
  public hasSubCategories:boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public phrasesProvider: PhrasesProvider,
    public modalCtrl: ModalController,
    private _actionSheetCtrl: ActionSheetController,
    public categoryService: CategoryServiceProvider,
  ) {
    //get the parent category object from the clickable category.
    this.parentCategory = navParams.get('parentCategory');
    console.log("perent is = " + this.parentCategory.id);
    this.AsyncPhrasesloader();

  }

  ionViewDidLoad(){
    document.getElementById("content").style.backgroundColor = this.backgroundColor;//set the backgound color
  }

  //initial phrases array for ngFor and sub-categories array for ngFor
  //promise is an Promise object that gets the return value only when its ready (await)
  // from phrase provider.
  //temp is an promise object that help to get the phrases from promis's resolve attr.
  public AsyncPhrasesloader() {
    let promise = this.phrasesProvider.getPhrases(this.parentCategory);
    promise.then((data) => {
      this.phrases = data;
      this.phrasesProvider.phrases = data;
    })
    
    let promise1 = this.categoryService.updateCategoriesArray();
    promise1.then((data)=> {
      this.subCategories = data.filter(cat => cat.parentCategoryID == this.parentCategory.id);
      //dispaly the sub categories section only if there is at least one sub category
      this.hasSubCategories = (this.subCategories.length > 0) ? true : false;//check if there is a sub category
    })
  }

  public removeSubCategory(category: Category){
    this.categoryService.removeCategory(category);
    this.AsyncPhrasesloader()
  }

  //popup the category's phrases's page, using for sub-catergories
  public openCategoryPhrases(category: Category){
    this.navCtrl.push(PhrasesPage, {
      parentCategory: category
    }); 
  }
  

  /**on click method when the user click on a phrase
   * the method check if to add the phrase to the common phrases list.
   * @param phrase the phrase that clicked
  */
  /*public phraseOnClick(phrase:Phrase){
    phrase.views++;
    this.favProvider.addCommonFavPhrases(phrase);
  }*/
  //WAS MOVED to phrase.ts component which is clickable


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

  /** When the add button pressed in a phrases page it can be in two different version
   *  if this is a normal category the user can add phrase or sub-category
   *  if this is a sub category the user can add only a phrase
   * 
   *  we check if this is a sub category by checking the parentCategoryID field in the category object
   *  if there is a value there it means that this is a sub category 
   *  if not this is a normal category
   */
  addButtonPressed() {
    if (this.parentCategory.parentCategoryID == "")
      this.presentActionSheet();
    else
      this.openAddPage(Enums.ADD_OPTIONS.PHRASE);
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
      { 'fromWhere': fromWhere, 'categoryID': this.parentCategory.id });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form

        if (fromWhere == Enums.ADD_OPTIONS.PHRASE) {
          //create new phrase from the output form
          // let newPhrase =
          //   new Phrase("", item.text, item.imagePath, item.categoryID, 0, item.audioFile, false);
          this.addPhrase(item);//upload the new phase to the DB and refresh the screen
        } else if (fromWhere == Enums.ADD_OPTIONS.CATEGORY) {
          // let newSubCategory =
          // new Category(item.text, "", item.imagePath, this.aAuth.auth.currentUser.email, item.categoryID, 0, false);
          this.categoryService.addCategory(item);

          //refreshing the sub-categories in phrases page.
          this.AsyncPhrasesloader()
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
