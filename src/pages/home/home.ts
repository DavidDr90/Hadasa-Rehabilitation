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
import { User } from '../../models/user';
import { forEach } from '@firebase/util';


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
  users = [];
  user_name = "אורח";
  constructor(public navCtrl: NavController,public firebase: FirebaseProvider) {

    // var new_user;
    // new_user = new User("Or", "Cohen");
    // firebase.addUser(new_user)

    // this.users = firebase.getUsers();
    firebase.filterBooks()
    console.log();

  }

  public printUsers()
  {
  
  }
  

  // Should get the user name from the login process
  get userName(){
    // TODO:
    // get the user name from the Google account.
    return this.user_name;
  }

}
