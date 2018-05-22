import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { MyApp } from '../../app/app.component';
import { HomePage } from '../home/home';
import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-intro-slider',
  templateUrl: 'intro-slider.html'
})
export class IntroSliderPage 
{
  tabsPage = TabsPage;
  appPage = MyApp
  loading_sign = false;
  
  //allows to access its childeren (individual slides)
  @ViewChild(Slides) slides:Slides; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public authentication: AutenticationProvider) {
   // this.checkIfDataLoaded();
   this.loading_sign = false;
  }

  ionViewDidLoad() {
    //On page loading checks if the user already logged in.
    //if the user logged in already sets 'TabsPage' as main page.
    this.authentication.afAuth.auth.onAuthStateChanged((user)=>{
      if(user)
        this.navCtrl.setRoot(TabsPage);
    })
  }
  
  // This function called by clicking login-button.
  public async logIn()
  {
    this.loading_sign = true;
    // The function toggleSignIn will connect the user with redirect-auth.
    let promise = this.authentication.toggleSignIn();
  } 
}
  
