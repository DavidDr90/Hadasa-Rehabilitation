import { Component/*, Input, Output*/ } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { CategoryServiceProvider } from '../../providers/category-service/category-service';
//import { Client } from '../../models/Client';
import { CategoriesPage } from '../categories/categories';
import { AboutMePage } from '../about-me/about-me';
//import { PhrasesPage } from '../phrases/phrases';
import { AddPhrasePage } from '../add-phrase/add-phrase';
import { MockTestPage } from '../mock-test/mock-test';


import { FirebaseProvider } from '../../providers/firebase/firebase'
// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated'
import { User } from '../../models/user';
import { AutenticationProvider } from '../../providers/autentication/autentication';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  //homePage = HomePage;
  categoriesPage = CategoriesPage;
  aboutMePage = AboutMePage;  
  addPhrasePage = AddPhrasePage;
  mockTestPage = MockTestPage;
  user_name = "אורח";



  private users: User[];


  constructor(public navCtrl: NavController,public firebaseProvider: FirebaseProvider,public authentication: AutenticationProvider) {
  
    if(authentication.loggedIn)
    {
      this.updateDisplayName();
      // this.user_name = authentication.GetDisplayName;
      var user_exists = false;
      firebaseProvider.getUsers.forEach(user => 
      {
        if(user.getEmail == authentication.user.email)
        {
          user_exists = true;
        }
      })
      if(!user_exists)
      {
        firebaseProvider.addUser(new User(authentication.user.email));
      }
    }
    
  }


  public updateDisplayName()
  {
    this.authentication.afAuth.authState.subscribe(auth=>
      {
        this.user_name= auth.displayName;
      });
  }

  public set setDisplayName(displayName)
  {
    this.user_name = displayName;
  }

  // Should get the user name from the login process
  get userName(){
    // TODO:
    // get the user name from the Google account.
    return this.user_name;
  }

}
