import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Client } from '../../models/Client';


/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  private client: Client;

  constructor(public categoryService: CategoryServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    categoryService.importCategories(this.client);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  public getClient(): Client{
      return this.client;
    }

}
