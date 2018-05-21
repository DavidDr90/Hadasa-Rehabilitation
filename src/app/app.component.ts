import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';
import { TabsPage } from '../pages/tabs/tabs';
import { AutenticationProvider } from '../providers/autentication/autentication';

import { CategoriesPage } from '../pages/categories/categories';
import { HomePage } from '../pages/home/home';
import { AddPhrasePage } from '../pages/add-phrase/add-phrase';
import { AboutMePage } from '../pages/about-me/about-me';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;
 
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
      public authentication: AutenticationProvider) 
    {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

      });

      //check if current user is login, initialize authentication.loggedIn attr.
      this.authentication.isLoggedIn();
      //considering authentication.loggedIn set the following page: homePage or loginPage
      this.getRootPage();
    }

  //---------------------------------------------------------------------------//
  //considering authentication.loggedIn set the following page: homePage or loginPage
  //if current user doesn't logged in -> popup google login window.  
  getRootPage(){
    if(this.authentication.loggedInStatus()){
      this.rootPage = TabsPage;
    }
    else{
      this.rootPage = IntroSliderPage; 
      this.authentication.createAuthentication().then(()=>{
        this.rootPage = TabsPage;
      })
      
    }
  }
  //---------------------------------------------------------------------------//
  
  

}

