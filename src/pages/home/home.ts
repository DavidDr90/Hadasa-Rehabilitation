import { Component, Input, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Client } from '../../models/Client';
import { CategoriesPage } from '../categories/categories';
//import { Page } 'ionic-angular';

import { CategoriesPage } from '../categories/categories';
import { AboutMePage } from '../about-me/about-me';
import { PhrasesPage } from '../phrases/phrases';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

// @Page({
//   templateUrl: 'categories.html'
// })

export class HomePage {  
  categoriesPage = CategoriesPage;
  aboutMePage = AboutMePage;  
  categoriesPage = CategoriesPage;


//   pages = PhrasesPage

  constructor(public navCtrl: NavController) {

  }

  user_name = "אורח";

  // Should get the user name from the login process
  get userName(){
    // TODO:
    // get the user name from the Google account.
    return this.user_name;
  }
}
