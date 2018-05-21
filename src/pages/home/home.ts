import { Component/*, Input, Output*/ } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPhrasePage } from '../add-phrase/add-phrase';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { User } from '../../models/user';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { StorageProvider } from '../../providers/storage/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  addPhrasePage = AddPhrasePage;

  user_name = "אורח";
  
  percentage; // Should be implement on uploading 
  

  constructor(public navCtrl: NavController,
               public firebaseProvider: FirebaseProvider,
               public authentication: AutenticationProvider,
               public storage : StorageProvider, 
               public categoryProvider: CategoryServiceProvider) {
    
    this.percentage = 0;

    //Sets the display name of the logged-in user
    this.user_name = authentication.user.displayName;
    
  }
  /* old home - can be deleted???
  constructor(public navCtrl: NavController,
              public firebaseProvider: FirebaseProvider, public authentication: AutenticationProvider) {

    //when user logged in, check in DB if the user is a new user.
    //if current user is new, add the user to DB.
    if (authentication.loggedIn) {
      var user_exists = false;
      let x = firebaseProvider.getUsersObservable.subscribe(a => {
        this.users = a;
        this.users.forEach(user => {
          if (user.getEmail == authentication.user.email) {
            user_exists = true;
          }

        });
        if (!user_exists) {
          firebaseProvider.addUser(new User(authentication.user.email));
        }
        this.user_name = authentication.afAuth.auth.currentUser.displayName;
        //after the user is loaded successfuly, stop subscribe users from DB.
        if (this.user_name != "אורח") {
          x.unsubscribe();
        }
      })

    }


  }*/


}
