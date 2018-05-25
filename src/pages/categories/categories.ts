import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';

import { Category } from '../../models/Category';
import { PhrasesPage } from '../phrases/phrases';

import * as Enums from '../../consts/enums';
import { StorageProvider } from '../../providers/storage/storage';
import { FavoriteProvider } from '../../providers/Favorite/Favorite';
import { HomePage } from '../home/home';


const isCategory = true;

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  public phrasesPage: PhrasesPage;
  favProvider:FavoriteProvider;

  constructor(public categoryService: CategoryServiceProvider,
              public navParams: NavParams,
              public modalCtrl:ModalController,
              public navCtrl:NavController,
              public storage:StorageProvider) {
    
    this.favProvider=new FavoriteProvider(HomePage.favClass); 
    
  }

  //popup the category's phrases's page.
  public openCategoryPhrases(category: Category){
    this.navCtrl.push(PhrasesPage, {
      parentCategory: category
    }); 
  }

  /**display the addPhrasePage and get the retrun object from the form.
   * Prompt the user to add a new category. This shows our AddPhrasePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  openAddPage() {
    let addModal = this.modalCtrl.create('AddPhrasePage',  {'fromWhere': Enums.ADD_OPTIONS.CATEGORY});
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form
        console.log(item);
        //TOOD: here we should upload the 'item' to the DB using Or & Dor firebaseProvider
      }
    })
    addModal.present();//present the addPhrasePage
  }

  //TODO: enter edit mode
  edit(){
    console.log("edit category");
  }

/**on click method when the user click on a category*/
  public catOnClick(cat:Category){
    cat.views++;
    this.favProvider.addCommonFavCat(cat);
  }

}

