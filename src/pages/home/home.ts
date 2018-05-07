import { Component, Input, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Client } from '../../models/Client';
import { CategoriesPage } from '../categories/categories';
import { AboutMePage } from '../about-me/about-me';
import { PhrasesPage } from '../phrases/phrases';
import { AddPhrasePage } from '../add-phrase/add-phrase';
import { MockTestPage } from '../mock-test/mock-test';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

// @Page({
//   templateUrl: 'categories.html'
// })

export class HomePage {
  homePage = HomePage;
  categoriesPage = CategoriesPage;
  aboutMePage = AboutMePage;  
  addPhrasePage = AddPhrasePage;
  mockTestPage = MockTestPage;
  
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
