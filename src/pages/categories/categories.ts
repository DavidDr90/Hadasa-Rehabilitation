import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';

import { Category } from '../../models/Category';
import { PhrasesPage } from '../phrases/phrases';

import * as Enums from '../../consts/enums';
import { StorageProvider } from '../../providers/storage/storage';
import { AngularFireAuth } from 'angularfire2/auth';


const isCategory = true;

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  public phrasesPage: PhrasesPage;
  private tempCategory

  constructor(
    public categoryService: CategoryServiceProvider,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public navCtrl:NavController,
    public storage:StorageProvider,
    public aAuth: AngularFireAuth) 
    {
      //for testing, need to delete after using
        this.getCategoryByNameHandler();
      
    }

    //for testing, need to delete after using
    public getCategoryByNameHandler(){
      let promise = this.categoryService.getCategoryByName("Holy Moly");
      promise.then((data) =>{
        this.tempCategory = data;
        this.tempCategory as Category
      })
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
        //create a new cateogry
        let newCategory = new Category(item.text, "", item.imagePath, this.aAuth.auth.currentUser.email, "", 0, false);
        this.categoryService.addCategory(newCategory);//upload the new category to the DB
      }
    })
    addModal.present();//present the addPhrasePage
  }
  //TODO: enter edit mode
  edit(){
    console.log("edit category");
  }
}
