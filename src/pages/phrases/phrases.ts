import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, LoadingController, reorderArray, AlertController  } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Category } from '../../models/Category';
import { Phrase } from '../../models/Phrase';

import * as Enums from '../../consts/enums';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { AddPhrasePage } from '../add-phrase/add-phrase';

@Component({
  selector: 'page-phrases',
  templateUrl: 'phrases.html'
})
export class PhrasesPage {

  public backgroundColor: any;
  public parentCategory: Category;
  public phrases: Phrase[];
  public subCategories: Category[];
  public hasSubCategories: boolean = false;
  public showPhrases: boolean = false;
  public hasPhrases: boolean = false;

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
    this.backgroundColor = this.parentCategory.color.englishName;
    this.AsyncPhrasesloader();
  }

  ionViewDidLoad() {
    document.getElementById("content").style.backgroundColor = this.backgroundColor;//set the backgound color
  }

  //initial phrases array for ngFor and sub-categories array for ngFor
  //promise is an Promise object that gets the return value only when its ready (await)
  // from phrase provider.
  //temp is an promise object that help to get the phrases from promis's resolve attr.
  public AsyncPhrasesloader() {
    console.log("in async file load");
    let promise = this.phrasesProvider.getPhrases(this.parentCategory);
    promise.then((data) => {
      this.phrases = data;
      this.phrasesProvider.phrases = data;
      if (this.phrases != undefined)
        if (this.phrases.length > 0)
          this.hasPhrases = true;
    })
    let promise1 = this.categoryService.updateCategoriesArray();
    promise1.then((data) => {
      this.subCategories = data.filter(cat => cat.parentCategoryID == this.parentCategory.id);
      //dispaly the sub categories section only if there is at least one sub category
      this.hasSubCategories = (this.subCategories.length > 0) ? true : false;//check if there is a sub category
    })
  }

  //remove category and update DB
  public removeSubCategory(category: Category) {
    this.categoryService.removeCategory(category);
    setTimeout(() => {
       this.AsyncPhrasesloader()  
    }, 1500)   
  }

  //popup the category's phrases's page, using for sub-catergories
  public openCategoryPhrases(category: Category) {
    this.navCtrl.push(PhrasesPage, {
      parentCategory: category
    });
  }

  //handler that add phrase and update the display 
  public addPhrase(phrase: Phrase) {
    console.log("in add phrase")
    setTimeout(() => {
      this.phrasesProvider.addPhrase(phrase);
      this.AsyncPhrasesloader()      
    }, 500)
    this.phrasesProvider.arrangePhrasesByOrder();
    
  }

  //handler that remove phrase and update the display 
  public removePhrase(phrase: Phrase) {
    console.log("in add phrase")
    setTimeout(async () => {
      await this.phrasesProvider.removePhrase(phrase);
      this.AsyncPhrasesloader()      
    }, 500)
    this.phrasesProvider.arrangePhrasesByOrder();
    
  }

  /** When the add button pressed in a phrases page it can be in two different version
  *  if this is a normal category the user can add phrase or sub-category
  *  if this is a sub category the user can add only a phrase
  * 
  *  we check if this is a sub category by checking the parentCategoryID field in the category object
  *  if there is a value there it means that this is a sub category 
  *  if not this is a normal category
  *   if we are in edit mode IGNORE
  */
  addButtonPressed() {
    if(this.editFlag)
      return;//no action
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
          this.AsyncPhrasesloader()
        }
      }
    })
    addModal.present();//present the addPhrasePage
  }


  /*******************  Edit Mode section ****************/

  Pvisible: boolean = true;
  Svisible: boolean = true;
  editFlag: boolean = false;
  editButtonName: string = "עריכה";

  //handle edit mode button logic, 
  //when the edit flag is set you have edit functionality 
  //and not regular functionality
  async edit() {
    if (this.editFlag) {
      this.editFlag = false;
      this.editButtonName = "עריכה";
      //await this.AsyncPhrasesloader()
      //await this.categoryService.updateCategoriesArray(); //update DB
    } else {
      this.editFlag = true;
      this.editButtonName = "סיים";
    }
  }

     /**
   * Using reorderArray to move element between positions in the array
   * then update order of each sub-category using its new place in the array
   * @param index used to get element original and new positions from the HTML
   */
  async reorderSubCategories(index) {
    console.log("edit -reorder from: " + index.from + "to: " + index.to);
    this.subCategories = await this.categoryService.getSubCategoriesOfParent(this.parentCategory.id);
    this.subCategories = reorderArray(this.subCategories, index);//reordering array
    //updating each category order field according to its array position
    for(var i = 0; i < this.subCategories.length; i++){ 
      await this.categoryService.setOrder(this.subCategories[i], i + 1);         
    } 
  }

    /**
   * Using reorderArray to move element between positions in the array
   * then update order of each sub-category using its new place in the array
   * @param index used to get element original and new positions from the HTML
   */
  async reorderPhrases(index){
    console.log("edit -reorder from: " + index.from + "to: " + index.to);    
    //let phraseArray = await this.phrasesProvider.getPhrases(this.parentCategory);    
    this.phrases = reorderArray(this.phrases, index);//reordering array
    //updating each category order field according to its array position
    for(var i = 0; i < this.phrases.length; i++){ 
      await this.phrasesProvider.setOrder(this.phrases[i], i + 1);   
    } 
  }

  /**
   * edit sub category usin add phrase page
   * @param item sub cat to edit
   */
  editSubCategory(item) {
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

  /**
   * delete category
   * @param item category to delete
   */
  deleteSubCategory(item) {
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

  changeSubCatVisibility(item) {
    /**TODO:
     * change the visibility status when clicked
     * the unvisibale categories should by in a different style then the visible on
     * the user can see the unvisibale categories only in 'edit mode'
     */
    console.log("edit visibility sub");
    console.log(item);
    this.categoryService.changeVisibility(item);
  }

  /**
   * edit phrase using add phrase page
   * @param item prase to edit
   */
  editPhrase(item) {
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
  deletePhrase(item) {
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

  changephraseVisibility(item) {
    /**TODO:
     * change the visibility status when clicked
     * the unvisibale categories should by in a different style then the visible on
     * the user can see the unvisibale categories only in 'edit mode'
     */
    console.log("edit visibility phrase");
    console.log(item);
    this.phrasesProvider.changeVisibility(item);
  }

  /**
  * on click for the "show/hide phrases" button
  */
  public onClickShowPhrases() {
    console.log(this.showPhrases)
    this.showPhrases = !this.showPhrases;
  }



}

