import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, LoadingController } from 'ionic-angular';
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
  public backgroundColor: any;

  public parentCategory: Category;
  public phrases;
  public subCategories;
  public hasSubCategories:boolean = false;
  public showPhrases:boolean=false;
  public hasPhrases:boolean=false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public phrasesProvider: PhrasesProvider,
    public modalCtrl: ModalController,
    private _actionSheetCtrl: ActionSheetController,
    public categoryService: CategoryServiceProvider,
    public loadingCtrl: LoadingController,
  ) {
    //get the parent category object from the clickable category.
    this.parentCategory = navParams.get('parentCategory');
    this.backgroundColor = this.parentCategory.color.englishName;
    this.AsyncPhrasesloader();
  }

  //TODO:fix the background color
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
      if(this.phrases!=undefined)
        if(this.phrases.length>0)
          this.hasPhrases=true;
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
          text: '\xa0 הוספת ביטוי',
          icon: 'camera',
          handler: () => {
            this.openAddPage(Enums.ADD_OPTIONS.PHRASE);
          }
        },
        {
          text: '\xa0 הוספת תת-קטגוריה',
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
          this.addPhrase(item);//upload the new phase to the DB and refresh the screen
        } else if (fromWhere == Enums.ADD_OPTIONS.CATEGORY) {
          this.categoryService.addCategory(item);
          //refreshing the sub-categories in phrases page.
          this.AsyncPhrasesloader()
        }
      }
    })
    addModal.present();//present the addPhrasePage
  }


  /*******************  Edit Mode section ****************/

  Pvisible:boolean = true;
  Svisible:boolean = true;
  editFlag: boolean = false;
  editButtonName: string = "עריכה";

  edit() {
    if( this.editFlag){
      this.editFlag = false;
      this.editButtonName = "עריכה";
      /**TODO:
       * after the user press the "סיים" button
       * save the local array changes in the DB array
       */
    }else{
      this.editFlag = true;
      this.editButtonName = "סיים";

    }
    
  }

  reorderItem(index){
    let element = this.categoryService.getCategories[index.from];//save the draged category
    /**TODO:
     * change the array of ctegories as follow:
     * categpriesArrya.splice(index.from, 1);
     * categpriesArrya.splice(index.to, 1);
     */
  }

  editSubCategory(item){
    /**TODO:
     * enter the add phrase page with the clicked item
     * then allow the user to change any filed
     * in the end save the changes and update all the arrays and DB
     */
    console.log("edit sub");
    console.log(item);
  }

  deleteSubCategory(item){
    /**TODO:
     * use dor's function and delete the category 
     * and all the sub categories and phrases 
     * update the view
     */
    console.log("delete sub");
    console.log(item);
  }
  
  changeSubVisibility(item){
    /**TODO:
     * change the visibility status when clicked
     * the unvisibale categories should by in a different style then the visible on
     * the user can see the unvisibale categories only in 'edit mode'
     */
    console.log("visibility sub");
    console.log(item);
  }

  editPhrase(item){
    /**TODO:
     * enter the add phrase page with the clicked item
     * then allow the user to change any filed
     * in the end save the changes and update all the arrays and DB
     */
    console.log("edit phrase");
    console.log(item);
  }

  deletePhrase(item){
    /**TODO:
     * use dor's function and delete the category 
     * and all the sub categories and phrases 
     * update the view
     */
    console.log("delete phrase");
    console.log(item);
  }
  
  changeVisibility(item){
    /**TODO:
     * change the visibility status when clicked
     * the unvisibale categories should by in a different style then the visible on
     * the user can see the unvisibale categories only in 'edit mode'
     */
    console.log("visibility phrase");
    console.log(item);
  }

  /**
   * on click for the "show/hide phrases" button
   */
  public onClickShowPhrases(){
    console.log(this.showPhrases)
    this.showPhrases=!this.showPhrases;
  }

  

}
