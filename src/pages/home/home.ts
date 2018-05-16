import { Component/*, Input, Output*/ } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { AboutMePage } from '../about-me/about-me';
import { PhrasesPage } from '../phrases/phrases';
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
  private users: User[] = [];
  
  percentage; // Should be implement on uploading 
  

  constructor(public navCtrl: NavController,public firebaseProvider: FirebaseProvider,public authentication: AutenticationProvider,public storage : StorageProvider, public categoryProvider: CategoryServiceProvider) {
    this.percentage = 0;

    //Sets the display name of the logged-in user
    this.user_name = authentication.user.displayName;
    
  }

  get userName(){
    // TODO:
    // get the user name from the Google account.
    return this.user_name;
  }

}
