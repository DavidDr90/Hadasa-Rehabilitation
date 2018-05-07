import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';
import { TabsPage } from '../pages/tabs/tabs';
import { AutenticationProvider } from '../providers/autentication/autentication';
import { delay } from 'rxjs/operator/delay';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
      public authentication: AutenticationProvider) 
    {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

      });
      //async calling 
      //this.helper();
      console.log("before");
      this.authentication.isLoggedIn();
      console.log("after");
      this.getRootPage();
    }
  //logic to choose root page, uses LoginProvider
  //make sure to update it when implementing login feature

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
  
  public async helper(){

  }

  

}

