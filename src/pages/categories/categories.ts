import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';

import { Category } from '../../models/Category';
import { PhrasesPage } from '../phrases/phrases';

import * as Enums from '../../consts/enums';
import { StorageProvider } from '../../providers/storage/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { FavoriteProvider } from '../../providers/favorite/favorite';


@IonicPage()
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
    public storage: StorageProvider) {

    this.favProvider = new FavoriteProvider(HomePage.favClass);

  }

  //popup the category's phrases's page.
  public openCategoryPhrases(category: Category) {
    this.navCtrl.push(PhrasesPage, {
      parentCategory: category
    });
  }

  /**display the addPhrasePage and get the retrun object from the form.
   * Prompt the user to add a new category. This shows our AddPhrasePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  openAddPage() {
    let addModal = this.modalCtrl.create('AddPhrasePage',
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

  editCategory(item){
    console.log("edit");
    console.log(item);
  }

  deleteCategory(item){
    console.log("delete ");
    console.log(item);
  }


}

