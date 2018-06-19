import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, LoadingController, AlertController, reorderArray } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Category } from '../../models/Category';
import { Phrase } from '../../models/Phrase';

import * as Enums from '../../consts/enums';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { CategoriesPage } from '../categories/categories';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AddPhrasePage } from '../add-phrase/add-phrase';

@Component({
  selector: 'page-phrases',
  templateUrl: 'phrases.html'
})
export class PhrasesPage {

  public backgroundColor: any;
  public parentCategory: Category;
  //public phrases;
  public subCategories: Category[];
  public hasSubCategories: boolean = false;
  public showPhrases: boolean = false;
  //public hasPhrases: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public phrasesProvider: PhrasesProvider,
    public modalCtrl: ModalController,
    private _actionSheetCtrl: ActionSheetController,
    public categoryService: CategoryServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl : AlertController,
  ) {
    //get the parent category object from the clickable category.
    this.parentCategory = navParams.get('parentCategory');
    this.backgroundColor = this.parentCategory.color.englishName; //use parents color as background
    this.updatePhrasesArray();
  }

  ionViewDidLoad(){
    document.getElementById("content").style.backgroundColor = this.backgroundColor;//set the backgound color
  }

  private updatePhrasesArray(){
    this.phrasesProvider.AsyncPhrasesloader(this.parentCategory);
    let promise1 = this.categoryService.updateCategoriesArray();
    promise1.then((data) => {
      this.subCategories = data.filter(cat => cat.parentCategoryID == this.parentCategory.id);
      //dispaly the sub categories section only if there is at least one sub category
      this.hasSubCategories = (this.subCategories.length > 0) ? true : false;//check if there is a sub category
    });
  }

  public async removeSubCategory(category: Category){
    await this.categoryService.removeCategory(category);
    this.updatePhrasesArray();
  }

  //popup the category's phrases's page, using for sub-categories
  public openCategoryPhrases(category: Category){
    this.navCtrl.push(PhrasesPage, {
      parentCategory: category
    }); 
  }
  
  //handler that add phrase and update the display 
  public addPhrase(phrase: Phrase) {
    setTimeout(async () => {
      await this.phrasesProvider.addPhrase(phrase);
      //this.updatePhrasesArray();
    }, 500)
  }

  //handler that remove phrase and update the display 
  public removePhrase(phrase: Phrase) {
     setTimeout(() => {
      this.phrasesProvider.removePhrase(phrase);
      //this.updatePhrasesArray();
    }, 500)
  }

  /** When the add button pressed in a phrases page it can be in two different version
   *  if this is a normal category the user can add phrase or sub-category
   *  if this is a sub-category the user can add only a phrase
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


  /**display the addPhrasePage and get the return object from the form.
  * Prompt the user to add a new phrase. This shows our AddPhrasePage in a
  * modal and then adds the new item to our data source if the user created one.
  */
  openAddPage(fromWhere) {
    let addModal = this.modalCtrl.create(AddPhrasePage,
      { 'fromWhere': fromWhere, 'categoryID': this.parentCategory.id });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form

        if (fromWhere == Enums.ADD_OPTIONS.PHRASE) {
          //create new phrase from the output form
          this.addPhrase(item);//upload the new phase to the DB and refresh the screen
        } else if (fromWhere == Enums.ADD_OPTIONS.CATEGORY) {
          this.categoryService.addCategory(item);
          //refreshing the sub-categories in phrases page.         
        }
        this.updatePhrasesArray();
      }
    })
    addModal.present();//present the addPhrasePage
  }


  /*******************  Edit Mode section ****************/

  Pvisible:boolean = true;
  Svisible:boolean = true;
  editFlag: boolean = false;
  editButtonName: string = "עריכה";

  async edit() {
    if(this.editFlag){
      this.editFlag = false;
      this.editButtonName = "עריכה";
      await this.updatePhrasesArray();
      await this.categoryService.updateCategoriesArray(); //update DB

      
    }else{
      this.editFlag = true;
      this.editButtonName = "סיים";
    }
    
  }

   /**
   * Using reorderArray to move element between positions in the array
   * then update order of each sub-category using its new place in the array
   * @param index used to get element original and new positions from the HTML
   */
  async reorderSubCategories(index){
    console.log("edit -reorder from: " + index.from + "to: " + index.to);
    let subCatArray = await this.categoryService.getSubCategoriesOfParent(this.parentCategory.id);
    console.log("size: " + subCatArray.length);
    subCatArray = reorderArray(subCatArray, index);//reordering array
    //updating each category order field according to its array position
    for(var i = 0; i < subCatArray.length; i++){ 
      await this.categoryService.setOrder(subCatArray[i], i + 1);   
      console.log("updated i: " + i);   
    } 

  }

  /**
   * Using reorderArray to move element between positions in the array
   * then update order of each sub-category using its new place in the array
   * @param index used to get element original and new positions from the HTML
   */
  async reorderPhrases(index){
    console.log("edit -reorder from: " + index.from + "to: " + index.to);
    let phraseArray = await this.phrasesProvider.getPhrases(this.parentCategory);
    console.log("size: " + phraseArray.length);
    phraseArray = reorderArray(phraseArray, index);//reordering array
    //updating each category order field according to its array position
    for(var i = 0; i < phraseArray.length; i++){ 
      await this.phrasesProvider.setOrder(phraseArray[i], i + 1);   
      console.log("updated i: " + i);   
    } 
  }


  editSubCategory(item){
    console.log("edit subCategory");
    console.log(item);
    let categoryToEdit = item as Category;
    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': Enums.ADD_OPTIONS.CATEGORY,
        'categoryID': this.parentCategory.id,
        'editCategory': true,
        'categoryToEdit': item,
      });
    addModal.present();//present the addPhrasePage
  }

  deleteSubCategory(item){
    console.log("edit delete sub category");
    console.log(item);
    const alert = this.alertCtrl.create({
      title: 'בטוח למחוק?',
      message: 'המחיקה היא סופית וכוללת את כול התוכן של הקטגוריה כולל הביטויים שבה!',
      buttons: [
        {
          text: 'בטל',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'מ ח ק',
          handler: () => {
            console.log('delete clicked');
            this.removeSubCategory(item); //delete the category
          }
        }
      ]
    });
    alert.present();  
  }
  
  changeSubCatVisibility(item){
    /**TODO:
     * change the visibility status when clicked
     * the unvisibale categories should by in a different style then the visible on
     * the user can see the unvisibale categories only in 'edit mode'
     */
    console.log("edit visibility sub");
    console.log(item);
    this.categoryService.changeVisibility(item);
  }

  editPhrase(item){
    console.log("edit phrase");
    console.log(item);
    let phraseToEdit = item as Phrase;
    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': Enums.ADD_OPTIONS.PHRASE,
        'categoryID': this.parentCategory.id,
        'editPhrase': true,
        'phraseToEdit': item,
      });
    addModal.present();//present the addPhrasePage
  }

  /**
   * Delete selected phrase
   * @param item phrase to remove
   */
  deletePhrase(item){
    console.log("edit delete phrase");
    console.log(item);
    const alert = this.alertCtrl.create({
      title: 'בטוח למחוק?',
      message: 'המחיקה היא סופית!',
      buttons: [
        {
          text: 'בטל',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'מ ח ק',
          handler: () => {
            console.log('delete clicked');
            this.removePhrase(item); //delete the phrase
          }
        }
      ]
    });
    alert.present();      
  }
  
  changePhraseVisibility(item){
    /**TODO:
     * change the visibility status when clicked
     * the invisibale categories should by in a different style then the visible on
     * the user can see the unvisibale categories only in 'edit mode'
     */
    console.log("edit visibility phrase");
    console.log(item);
    this.phrasesProvider.changeVisibility(item);
  }

  /**
   * on click for the "show/hide phrases" button
   */
  public onClickShowPhrases(){
    console.log(this.showPhrases)
    this.showPhrases =! this.showPhrases;
  }

  

}
