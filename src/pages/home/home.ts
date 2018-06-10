import { Component, Input, Output } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { IntroSliderPage } from '../../pages/intro-slider/intro-slider'
import { AddPhrasePage } from '../add-phrase/add-phrase';

import { FavoritesComponent } from '../../components/favorites/favorites';
import { Favorite } from '../../models/Favorite';

import { FavoriteProvider } from '../../providers/favorite/favorite';
import { AppBuilderProvider } from '../../providers/app-builder/app-builder';
import { StorageProvider } from '../../providers/storage/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { PhrasesProvider } from '../../providers/phrases/phrases';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  addPhrasePage = AddPhrasePage;

  user_name = "אורח";
  static userEmail;

  percentage; // Should be implement on uploading

  static favClass: Favorite
  public favoriteProvider: FavoriteProvider
  public appBuilderProvider: AppBuilderProvider

  constructor(public navCtrl: NavController,
    public firebaseProvider: FirebaseProvider,
    public authentication: AutenticationProvider,
    public storage: StorageProvider,
    public categoryProvider: CategoryServiceProvider,
    public phrasesProvider: PhrasesProvider,
    public loadingCtrl: LoadingController
  ) {
    let loading = this.loadingCtrl.create({
      content: 'אנא המתן'
    });
    loading.present();

    this.percentage = 0;
    HomePage.userEmail = authentication.user.email;//fill the user email. being used in app-builder constructor.
    let catArray = categoryProvider.getCategories.concat(categoryProvider.getSubCategories)
    HomePage.favClass = new Favorite(catArray, categoryProvider.getAllUserPhrases);

    this.favoriteProvider = new FavoriteProvider(HomePage.favClass);

    if (HomePage.favClass.endFlag)
      loading.dismiss();

    this.appBuilderProvider = new AppBuilderProvider(this.categoryProvider, this.phrasesProvider);

    //Sets the display name of the logged-in user
    this.user_name = authentication.user.email;
  }

  // Called on pressing Log-out button.
  // Disconnects google authentication and moves the user to the into-slider-page.
  logOut() {
    console.log("logging out");
    // this.authentication.toggleSignIn();
    this.authentication.logOut()
    this.navCtrl.push(IntroSliderPage);
  }

  showFav() {
    console.log("==============================")
    console.log("FAVORITE")
    console.log(HomePage.favClass)
    console.log("common_cat")
    console.log(HomePage.favClass.common_cat)
    console.log("common_phrases")
    console.log(HomePage.favClass.common_phrases)
    console.log("chosen_fav_cat")
    console.log(HomePage.favClass.chosen_fav_cat)
    console.log("chosen_fav_phrases")
    console.log(HomePage.favClass.chosen_fav_phrases)
    console.log("==============================")
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
