import { Component/*, Input, Output*/ } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Client } from '../../models/Client';
import { CategoriesPage } from '../categories/categories';
import { AboutMePage } from '../about-me/about-me';
import { PhrasesPage } from '../phrases/phrases';
import { AddPhrasePage } from '../add-phrase/add-phrase';

import { FirebaseProvider } from '../../providers/firebase/firebase'
// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated'
import { User } from '../../models/user';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { StorageProvider } from '../../providers/storage/storage';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  addPhrasePage = AddPhrasePage;
  percentage;
  user_name = "אורח";

  private users: User[] = [];


  constructor(public navCtrl: NavController,public firebaseProvider: FirebaseProvider,public authentication: AutenticationProvider,public storage : StorageProvider) {
    this.percentage = 0;
  //when user logged in, check in DB if the user is a new user.
  //if current user is new, add the user to DB.
    if(authentication.loggedIn)
    {
      var user_exists = false;
      storage.getUploadPercent;
      let x = firebaseProvider.getUsersObservable.subscribe(a => {
        this.users = a;
        this.users.forEach(user => {
            if(user.getEmail == authentication.user.email) {
                user_exists = true;
            }
            
          });
        // if(!user_exists) {
        //    firebaseProvider.addUser(new User(authentication.user.email));
        // }
        this.user_name = authentication.afAuth.auth.currentUser.displayName;
        //after the user is loaded successfuly, stop subscribe users from DB.
        if(this.user_name != "אורח"){
          x.unsubscribe();
        }
      })
    }
    
  }

  get userName(){
    // TODO:
    // get the user name from the Google account.
    return this.user_name;
  }

  get getUploadPersentage()
  {
    this.percentage = this.storage.getUploadPercent;
    return this.percentage;
  }
}
