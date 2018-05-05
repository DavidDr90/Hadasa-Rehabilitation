import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';
import { LoginProvider} from '../providers/login/login';
import { AutenticationProvider } from '../providers/autentication/autentication';
//import { AddPhrasePage } from '../pages/add-phrase/add-phrase';
//import { MockTestPage } from '../pages/mock-test/mock-test';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any  = this.getRootPage();
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public login: LoginProvider,public authentication: AutenticationProvider) 
    {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

      });
      authentication.createAuthentication();

    }



  //logic to choose root page, uses LoginProvider
  //make sure to update it when implementing login feature
  getRootPage(): any {

    if(this.authentication.isLoggedIn())
      return HomePage;
    else
      return IntroSliderPage;  
  }

  async checkLogin()
  {
    await this.authentication.isLoggedIn();
  }



}

