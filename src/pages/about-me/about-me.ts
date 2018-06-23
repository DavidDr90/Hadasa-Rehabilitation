import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, reorderArray, AlertController, ActionSheetController, ItemSliding } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Category } from '../../models/Category';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Phrase } from '../../models/Phrase';
import * as Enums from '../../consts/enums';
import { PhrasesPage } from '../phrases/phrases';
import { ErrorProvider } from '../../providers/error/error';
import { AddPhrasePage } from '../add-phrase/add-phrase';


@Component({
  selector: 'page-about-me',
  templateUrl: 'about-me.html',
})
export class AboutMePage {

  public backgroundColor;
  public aboutMeCategory: Category
  public phrases: Phrase[];
  public subCategories: Category[];

  public hasSubCategories: boolean = false;
  public showPhrases: boolean = false;
  public hasPhrases: boolean = false;

  constructor(public categoryService: CategoryServiceProvider,
    public db: FirebaseProvider,
    public phrasesProvider: PhrasesProvider,
    public auth: AutenticationProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public errorProvider: ErrorProvider,
    public alertCtrl: AlertController,
    private _actionSheetCtrl: ActionSheetController, ) {
    categoryService.updateCategoriesArray();
    //getCategoriesByName return promise object
    let promise = categoryService.getCategoryByName(Enums.ABOUT_ME_STRING);
    promise.then((data) => {
      this.aboutMeCategory = data;
      this.aboutMeCategory as Category
      this.backgroundColor = this.aboutMeCategory.color.englishName;
      this.AsyncPhrasesloader();
    }).catch((e => {
      console.log("error import aboutme Category at aboutMe.ts");
      this.errorProvider.simpleTosat("error import aboutme Category");
    }))
  }

  //initial phrases array for ngFor and sub-categories array for ngFor
  //promise is an Promise object that gets the return value only when its ready (await)
  // from phrase provider.
  //temp is an promise object that help to get the phrases from promis's resolve attr.
  public AsyncPhrasesloader() {
    console.log("in async file load");
    let promise = this.phrasesProvider.getPhrases(this.aboutMeCategory);
    promise.then((data) => {
      this.phrases = data;
      this.phrasesProvider.phrases = data;
      if (this.phrases != undefined)
        if (this.phrases.length > 0)
          this.hasPhrases = true;
    })
    let promise1 = this.categoryService.updateCategoriesArray();
    promise1.then((data) => {
      this.subCategories = data.filter(cat => cat.parentCategoryID == this.aboutMeCategory.id);
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
    if (this.editFlag)
      return;//no action
    if (this.aboutMeCategory.parentCategoryID == "")
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
      { 'fromWhere': fromWhere, 'categoryID': this.aboutMeCategory.id });
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
    this.subCategories = reorderArray(this.subCategories, index);//reordering array
    //updating each category order field according to its array position
    let i = (index.from > index.to) ? index.to : index.from;
    let finish = (index.from > index.to) ? index.from : index.to;
    for (; i <= finish; i++) {
      await this.categoryService.setOrder(this.subCategories[i], i);
    }
  }

  /**
  * Using reorderArray to move element between positions in the array
  * then update order of each sub-category using its new place in the array
  * @param index used to get element original and new positions from the HTML
  */
  async reorderPhrases(index) {
    console.log("edit -reorder from: " + index.from + "to: " + index.to);
    this.phrases = reorderArray(this.phrases, index);//reordering array
    //updating each category order field according to its array position
    let i = (index.from > index.to) ? index.to : index.from;
    let finish = (index.from > index.to) ? index.from : index.to;
    for (; i <= finish; i++) {
      await this.phrasesProvider.setOrder(this.phrases[i], i);
    }
  }

  /**
   * edit sub category usin add phrase page
   * @param item sub cat to edit
   */
  editSubCategory(item, slidingItem: ItemSliding) {
    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': Enums.ADD_OPTIONS.CATEGORY,
        'categoryID': this.aboutMeCategory.id,
        'editCategory': true,
        'categoryToEdit': item,
      });
    addModal.onDidDismiss(it => {
      slidingItem.close();
    })
    addModal.present();//present the addPhrasePage
  }

  /**
   * delete category
   * @param item category to delete
   */
  deleteSubCategory(item) {
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

  /** change the visibility status when clicked, and close the slider
  * the unvisibale categories should by in a different style then the visible on
  * the user can see the unvisibale categories only in 'edit mode'
  */
  changeSubCatVisibility(item, slidingItem: ItemSliding) {
    this.categoryService.changeVisibility(item);
    slidingItem.close();
  }

  /**
   * edit phrase using add phrase page
   * @param item prase to edit
   */
  editPhrase(item, slidingItem: ItemSliding) {
    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': Enums.ADD_OPTIONS.PHRASE,
        'categoryID': this.aboutMeCategory.id,
        'editPhrase': true,
        'phraseToEdit': item,
      });
    addModal.onDidDismiss(it => {
      slidingItem.close();
    })
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

  /** change the visibility status when clicked, and close the slider
  * the unvisibale categories should by in a different style then the visible on
  * the user can see the unvisibale categories only in 'edit mode'
  */
  changePhraseVisibility(item, slidingItem: ItemSliding) {
    this.phrasesProvider.changeVisibility(item);
    slidingItem.close();
  }

  /**
  * on click for the "show/hide phrases" button
  */
  public onClickShowPhrases() {
    console.log(this.showPhrases)
    this.showPhrases = !this.showPhrases;
  }

}
