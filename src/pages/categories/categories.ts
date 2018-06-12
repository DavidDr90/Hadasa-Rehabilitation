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

    this.favProvider = new FavoriteProvider(HomePage.favClass);

  }

  //popup the category's phrases's page.
  public openCategoryPhrases(category: Category) {
    this.editFlag = false;
    this.editButtonName = "עריכה";

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
 
    } else {
      this.editFlag = true;
      this.editButtonName = "סיים";
      await this.categoryService.updateCategoriesArray; //update DB
    }

  }

  /**
   * Using reorderArray to move element between positions in the array
   * then update order of each category using new place in the array
   * @param index used to get element original and new positions from the HTML
   */
  async reorderItem(index) {
    console.log("edit");
    console.log("from: " + index.from);
    console.log("to: " + index.to);
    let temp = await this.categoryService.getCategories;
    let catArray = temp as Category[];
    console.log("size: " + catArray.length);
 
    catArray = reorderArray(catArray, index );
    for(var i = 0; i < catArray.length; i++){
      console.log("i: " + i);
      await this.categoryService.setOrder(catArray[i], i + 1);   
      console.log("done with i: " + i);   
    }
         
  }

  editCategory(item) {
    /**TODO:
     * enter the add phrase page with the clicked item
     * then allow the user to change any filed
     * in the end save the changes and update all the arrays and DB
     */
    console.log("edit");
    console.log(item);
  }

  deleteCategory(item) {
    console.log("delete");
    console.log(item);
    const alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Deleting category also removes all its content!!1',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'DELETE',
          handler: () => {
            console.log('delete clicked');
            this.categoryService.removeCategory(item);
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
    
    console.log("visibility");
    console.log(item);
    this.categoryService.changeVisibility(item);
    
  }


}

