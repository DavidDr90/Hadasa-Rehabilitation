import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Client } from '../../models/Client';
import { Category } from '../../models/Category';
import { AddPhrasePage } from '../add-phrase/add-phrase';
import * as Enums from '../../consts/enums';


const isCategory = true;
const CATEGORY = 1;

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  private client: Client;

  constructor(
    public categoryService: CategoryServiceProvider,
    public navParams: NavParams,
    public modalCtrl:ModalController) {
    
  }


  ionViewDidLoad() {
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


}
