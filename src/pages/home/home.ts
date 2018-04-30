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
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated'
import { AngularFireList } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  homePage = HomePage;
  categoriesPage = CategoriesPage;
  aboutMePage = AboutMePage;  
  addPhrasePage = AddPhrasePage;
  mockTestPage = MockTestPage;
  users;
  user_name = "אורח";
  constructor(public navCtrl: NavController, firebase: FirebaseProvider) {
    this.users = firebase.getImages();
    // console.log("Home: "+ this.users)
  }

  

  // Should get the user name from the login process
  get userName(){
    // TODO:
    // get the user name from the Google account.
    return this.user_name;
  }

}
