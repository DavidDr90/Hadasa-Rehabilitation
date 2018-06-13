import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';
import { TabsPage } from '../pages/tabs/tabs';
import { AutenticationProvider } from '../providers/autentication/autentication';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { Category } from '../models/Category';
import { AboutMeFormPage } from '../pages/about-me-form/about-me-form';
import * as Enums from '../consts/enums';

const ABOUT_ME_STRING = "aboutMe";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  aboutMeCategory: Category;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public authentication: AutenticationProvider,private categoryServiceProvider: CategoryServiceProvider,private loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.authentication.initApp();
    this.getRootPage();
   
  }

  //---------------------------------------------------------------------------//
  /* Written by Or. 
  *This function checks if the user logged-in or not, and if he is then
  *  it checks if the user has "aboueMe" category on the Database.
  * 
  *  If the user logged-in then checks if he has aboutMe category in DB.
  *  If the user has aboutMe --> goes to TabsPage
  *  Else go to about-me-form Page.
  *  If the user if not connected then go to the slider login page.
  *  */
  public getRootPage() {

    this.authentication.afAuth.auth.onAuthStateChanged(
    async user =>
    {
      debugger
      if (user && user.emailVerified)
      {
        let loading = this.loadingCtrl.create({
          content: 'אנא המתן'
        });
        loading.present();
    
      let update_promise = await this.categoryServiceProvider.updateCategoriesArray()
      let promise = this.categoryServiceProvider.getCategoryByName(Enums.ABOUT_ME_STRING);//try to get the about me category from the DB
      promise.then((data) => {
          console.log("Exists");
          this.rootPage = TabsPage;
      },
        (data) =>
      {
        this.rootPage = AboutMeFormPage;
        console.log("Nothing");
      })
      loading.dismiss()
      }
      else
      {
        this.rootPage = IntroSliderPage;
      }
    })
  }
  public setRootPage(page) {
    this.rootPage = page
  }
}

