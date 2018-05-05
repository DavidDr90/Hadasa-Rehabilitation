import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroSliderPage } from '../pages/intro-slider/intro-slider';
import { LoginProvider} from '../providers/login/login';
import { TabsPage } from '../pages/tabs/tabs';
//import { AddPhrasePage } from '../pages/add-phrase/add-phrase';
//import { MockTestPage } from '../pages/mock-test/mock-test';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = this.getRootPage();

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public login: LoginProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  //logic to choose root page, uses LoginProvider
  //make sure to update it when implementing login feature
  getRootPage(): any {
    if(this.login.loginStatus)
      return TabsPage;
    else
      return IntroSliderPage;  
  }


}

