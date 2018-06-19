import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, reorderArray } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';

import { Category } from '../../models/Category';
import { PhrasesPage } from '../phrases/phrases';

import * as Enums from '../../consts/enums';
import { StorageProvider } from '../../providers/storage/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { AddPhrasePage } from '../add-phrase/add-phrase';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  public phrasesPage: PhrasesPage;
  favProvider: FavoriteProvider;
  private tempCategory;

  constructor(public categoryService: CategoryServiceProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public storage: StorageProvider,
    public alertCtrl: AlertController) {

    

    this.categoryService.setIncludeAboutMe(false); //we ignore aboutMe category on this page
    this.categoryService.updateCategoriesArray();
    this.favProvider = new FavoriteProvider(HomePage.favClass);

  }

  ionViewWillEnter() { //we ignore aboutMe category on this page
    this.categoryService.setIncludeAboutMe(false);
    this.categoryService.updateCategoriesArray();
  }

  //popup the category's phrases's page, if in edit mode -> ignore
  public openCategoryPhrases(category: Category) {
    if(this.editFlag)
      return; //no action
    //this.editFlag = false;
    //this.editButtonName = "עריכה";

    this.navCtrl.push(PhrasesPage, {
      parentCategory: category
    });
  }

  /**display the addPhrasePage and get the retrun object from the form.
   * Prompt the user to add a new category. This shows our AddPhrasePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  openAddPage() {
    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': Enums.ADD_OPTIONS.CATEGORY,
        'categoryID': Enums.ADD_OPTIONS.NO_CATEGORY
      });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form
        this.categoryService.addCategory(item);//upload the new category to the DB
      }
    })
    addModal.present();//present the addPhrasePage
  }

  /*******************  Edit Mode section ****************/

  visible: boolean = true;
  editFlag: boolean = false;
  editButtonName: string = "עריכה";

  async edit() {
    if (this.editFlag) {
      this.editFlag = false;
      this.editButtonName = "עריכה";
      //we ignore aboutMe category on this page
      this.categoryService.setIncludeAboutMe(false);
      await this.categoryService.updateCategoriesArray(); //update DB
 
    } else {
      this.editFlag = true;
      this.editButtonName = "סיים";
      //we ignore aboutMe category on this page
      this.categoryService.setIncludeAboutMe(false);
      await this.categoryService.updateCategoriesArray(); //update DB
    }

  }

  /**
   * Using reorderArray to move element between positions in the array
   * then update order of each category using its new place in the array
   * @param index used to get element original and new positions from the HTML
   */
  async reorderItem(index) {
    console.log("edit -reorder from: " + index.from + "to: " + index.to);
    this.categoryService.setIncludeAboutMe(false);
    let temp = await this.categoryService.getCategories;
    //we ignore aboutMe category on this page
    let aboutMe = temp.find(cat => cat.name == Enums.ABOUT_ME_STRING);
    if(aboutMe != undefined){    
      var indexAM = temp.indexOf(aboutMe);
      if(index > -1)
        temp.splice(indexAM, 1);
    }
    let catArray = temp as Category[];
    console.log("edit reorder array size: " + temp.length);
    temp = reorderArray(temp, index);//reordering array
    //updating each category order field according to its array position
    for(var i = 0; i < temp.length; i++){ 
      await this.categoryService.setOrder(temp[i], i + 1);   
      console.log("updated i: " + i);   
    }       
  }

  /**
   * Edit selected category using add-phrase page, 
   * the existing category is updated based on user modifications
   * @param item the category to edit
   */
  editCategory(item) {
    console.log("edit -contents");
    console.log(item);
    let categoryToEdit = item as Category;
    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': Enums.ADD_OPTIONS.CATEGORY,
        'categoryID': categoryToEdit.id,
        'editCategory': true,
        'categoryToEdit': item,
      });
    addModal.present();//present the addPhrasePage
  }

  /**
   * Delete selected category after the user accepts the alert
   * @param item category to delete
   */
  deleteCategory(item) {
    console.log("edit -delete");
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
            this.categoryService.removeCategory(item); //delete the category
          }
        }
      ]
    });
    alert.present();    
  }

  changeVisibility(item) {
    /**TODO:
     * change the visibility status when clicked
     * the unvisibale categories should by in a different style then the visible on
     * the user can see the unvisibale categories only in 'edit mode'
     */
    
    console.log("edit -visibility");
    console.log(item);
    this.categoryService.changeVisibility(item);
    
  }


}

