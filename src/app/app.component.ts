import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';
import { TabsPage } from '../pages/tabs/tabs';
import { AutenticationProvider } from '../providers/autentication/autentication';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { Category } from '../models/Category';
import { AboutMeFormPage } from '../pages/about-me-form/about-me-form';

const ABOUT_ME_STRING = "aboutMe";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;
  aboutMeCategory : Category;
  
  constructor(platform: Platform, statusBar: StatusBar,private splashScreen: SplashScreen,
      public authentication: AutenticationProvider, public categoryProvider: CategoryServiceProvider) 
    {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

      });

      //check if current user is login, initialize authentication.loggedIn attr.
      // this.authentication.isLoggedIn();
      this.authentication.initApp();
      //considering authentication.loggedIn set the following page: homePage or loginPage
      this.getRootPage();
      this.navigate();


    }

  //---------------------------------------------------------------------------//
  //considering authentication.loggedIn set the following page: homePage or loginPage
  //if current user doesn't logged in -> popup google login window.  
  getRootPage(){
    // if(this.authentication.loggedInStatus()){
    if(!this.authentication.afAuth.auth.currentUser)
      this.rootPage = IntroSliderPage;
    
  }
  //---------------------------------------------------------------------------//
  
  public navigate()
  {
    this.categoryProvider.updateCategoriesArray();
    let promise = this.categoryProvider.getCategoryByName(ABOUT_ME_STRING);//try to get the about me category from the DB
    promise.then((data) =>{
      this.aboutMeCategory = data;
      this.aboutMeCategory as Category
      this.rootPage(TabsPage);
      console.log(this.aboutMeCategory.getName);
    },
  (rejectParam) =>
    {
      console.log(rejectParam);
      this.splashScreen.hide();
      this.rootPage = AboutMeFormPage;
    })
  }

  public setRootPage(page)
  {
    this.rootPage = page
  }


}

