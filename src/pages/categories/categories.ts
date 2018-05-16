import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, NavPush } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';

import { HomePage } from '../home/home';
import { AboutMePage } from '../about-me/about-me';
import { Category } from '../../models/Category';
import { PhrasesPage } from '../phrases/phrases';


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

  public phrasesPage: PhrasesPage;


  constructor(public categoryService: CategoryServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  //popup the category's phrases's page.
  public openCategoryPhrases(category: Category){
    this.navCtrl.push(PhrasesPage, {
      parentCategory: category
    }); 
  }


}
