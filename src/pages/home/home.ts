import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { AboutMePage } from '../about-me/about-me';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  
  categoriesPage = CategoriesPage;
  aboutMePage = AboutMePage;


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
