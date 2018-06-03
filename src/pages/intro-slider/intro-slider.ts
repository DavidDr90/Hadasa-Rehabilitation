import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { MyApp } from '../../app/app.component';
import { HomePage } from '../home/home';
import * as firebase from 'firebase/app';
import { AboutMeFormPage } from '../about-me-form/about-me-form';
import { User } from '../../models/user';
import { ErrorProvider } from '../../providers/error/error';


@IonicPage()
@Component({
  selector: 'page-intro-slider',
  templateUrl: 'intro-slider.html'
})
export class IntroSliderPage {
  tabsPage = TabsPage;
  appPage = MyApp
  loading_sign = false;
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authentication: AutenticationProvider, private errorProvider: ErrorProvider) {
    // this.checkIfDataLoaded();
    this.loading_sign = false;
  }

  ionViewDidLoad() {
    //On page loading checks if the user already logged in.
    //if the user logged in already sets 'TabsPage' as main page.
    this.authentication.afAuth.auth.onAuthStateChanged((user) => {
      if (user)
        this.navCtrl.setRoot(AboutMeFormPage);
    })
  }

  // This function called by clicking login-button.
  public async logIn() {
    // this.loading_sign = true;
    // The function toggleSignIn will connect the user with redirect-auth.
    // let promise = this.authentication.toggleSignIn(this.user);
    let logged_in = await this.authentication.signIn(this.user.email, this.user.password);
    if(!this.authentication.afAuth.auth.currentUser)
    this.errorProvider.simpleTosat(logged_in)
  }

  public register()
  {
    let registered =this.authentication.registerNewUser(this.user.email, this.user.password);
    if(!this.authentication.afAuth.auth.currentUser)
    this.errorProvider.simpleTosat(registered)
  }
}

