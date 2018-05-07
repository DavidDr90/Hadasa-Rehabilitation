import { Component, Input, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Client } from '../../models/Client';
import { CategoriesPage } from '../categories/categories';
//import { Page } 'ionic-angular';
import { AboutMePage } from '../about-me/about-me';
import { PhrasesPage } from '../phrases/phrases';
import { AddPhrasePage } from '../add-phrase/add-phrase';
import { MockTestPage } from '../mock-test/mock-test';
import { API_KEYS } from '../../consts/enums';
import { HttpProvider } from '../../providers/http/http'
import { NumbersPage } from '../numbers/numbers';


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
  numbersPage=NumbersPage;


  constructor(public navCtrl: NavController, public ht: HttpProvider) {

  }

  user_name = "אורח";

  // Should get the user name from the login process
  get userName() {
    // TODO:
    // get the user name from the Google account.
    return this.user_name;
  }

}
