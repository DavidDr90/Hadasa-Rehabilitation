import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { AddPhrasePage } from '../add-phrase/add-phrase';

import { Favorite } from '../../models/Favorite';

import { FavoriteProvider } from '../../providers/favorite/favorite';
import { StorageProvider } from '../../providers/storage/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { OurAppPage } from '../our-app/our-app';

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
  public isToggled: boolean;

  constructor(private modal: ModalController,
    public navCtrl: NavController,
    public firebaseProvider: FirebaseProvider,
    public authentication: AutenticationProvider,
    public storage: StorageProvider,
    public categoryProvider: CategoryServiceProvider,
    public phrasesProvider: PhrasesProvider,
    public loadingCtrl: LoadingController,
  ) {
    this.isToggled = true;

    this.percentage = 0;
    HomePage.userEmail = authentication.user.email;//fill the user email. being used in app-builder constructor.
    let catArray = categoryProvider.getCategories.concat(categoryProvider.getSubCategories)
    HomePage.favClass = new Favorite(catArray, categoryProvider.getAllUserPhrases, loadingCtrl);

    this.favoriteProvider = new FavoriteProvider(HomePage.favClass);


    //Sets the display name of the logged-in user
    // this.user_name = authentication.user.email;
    const userEmailWithoutEnd = authentication.user.email.split('@');
    this.user_name = userEmailWithoutEnd[0];
  }

  // Called on pressing Log-out button.
  // Disconnects google authentication and moves the user to the into-slider-page.
  logOut() {
    this.authentication.logOut()
  }

  /** display to the user a page with information about the app
   *  this can be accsses without registertion
   */
  aboutApp() {
    const myModal = this.modal.create(OurAppPage);
    myModal.present();
  }
}
