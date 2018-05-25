import { Component, Input, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { IntroSliderPage } from '../../pages/intro-slider/intro-slider'
import { AddPhrasePage } from '../add-phrase/add-phrase';

import { FavoritesComponent } from '../../components/favorites/favorites';
import { Favorite } from '../../models/Favorite';

import { FavoriteProvider } from '../../providers/Favorite/Favorite';
import { AppBuilderProvider } from '../../providers/app-builder/app-builder';
import { StorageProvider } from '../../providers/storage/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  addPhrasePage = AddPhrasePage;
   
  user_name = "אורח";
  
  percentage; // Should be implement on uploading
  
  static favClass:Favorite
  public favoriteProvider: FavoriteProvider

  constructor(public navCtrl: NavController,
               public firebaseProvider: FirebaseProvider,
               public authentication: AutenticationProvider,
               public storage : StorageProvider, 
               public categoryProvider: CategoryServiceProvider,
               ){
    this.percentage = 0;
    
    HomePage.favClass=new Favorite();
    this.favoriteProvider=new FavoriteProvider(HomePage.favClass);
    
    //Sets the display name of the logged-in user
    this.user_name = authentication.user.displayName;
    
  }

  // Called on pressing Log-out button.
  // Disconnects google authentication and moves the user to the into-slider-page.
  logOut(){
    console.log("logging out");
    this.authentication.toggleSignIn();
    this.navCtrl.push(IntroSliderPage);
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
