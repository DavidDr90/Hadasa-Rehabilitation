import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { MyApp } from '../../app/app.component';
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

  constructor(private modal: ModalController, public navCtrl: NavController, 
    public navParams: NavParams, public authentication: AutenticationProvider, private errorProvider: ErrorProvider) {
    // this.checkIfDataLoaded();
    this.loading_sign = false;
  }

  ionViewDidLoad() {
    //On page loading checks if the user already logged in.
    //if the user logged in already sets 'TabsPage' as main page.
    // this.authentication.afAuth.auth.onAuthStateChanged((user) => {
    //   if (user)
    //     this.navCtrl.setRoot(AboutMeFormPage);
    // })
  }

  // This function called by clicking login-button.
  public async logIn() {

    if (this.authentication.checkEmailValidity(this.user.email)) {
    // this.loading_sign = true;
    // The function toggleSignIn will connect the user with redirect-auth.
    // let promise = this.authentication.toggleSignIn(this.user);
    let logged_in = await this.authentication.signIn(this.user.email, this.user.password);
    if (this.authentication.afAuth.auth.currentUser) {
      //Checks if the user email verified. If it is not verified stay the user in this page.
      if (!this.authentication.afAuth.auth.currentUser.emailVerified) {
        this.errorProvider.simpleTosat("You must verify your email before log-in.");
        this.navCtrl.setRoot(IntroSliderPage);
        this.authentication.logOut();
      }
    }
    else {
      this.errorProvider.simpleTosat(logged_in)
    }
  }
  else{
    this.errorProvider.simpleTosat("Email is not valid.")
  }
  }

  public register() {
    
    if (this.authentication.checkEmailValidity(this.user.email)) 
    {
    let registered = this.authentication.registerNewUser(this.user.email, this.user.password);
    let res = new Promise((resolve, reject) => {
      resolve(registered);
    });

    res.then((data) => {
      if (this.authentication.afAuth.auth.currentUser) {
        //Sends verification email when user register at first time.
        this.authentication.afAuth.auth.currentUser.sendEmailVerification();
      }
      //Toasts the register state. (success or fail).
      this.errorProvider.simpleTosat(data)

    });
  }
  else{
    this.errorProvider.simpleTosat("Email is not valid.")
  }

  }

  /** display to the user a page with information about the app
   *  this can be accsses without registertion
   */
  aboutApp(){
    const myModal = this.modal.create('OurAppPage');

    myModal.present();
  }

  public resetPassword()
  {
    if (this.authentication.checkEmailValidity(this.user.email)) 
    {
      try{
      let promise = this.authentication.resetPassword(this.user.email);
      let res = new Promise((resolve, reject) => {
        resolve(promise);
      });
      res.then((data) => {
        this.errorProvider.simpleTosat(data)
      });
      }
      catch{
        this.errorProvider.simpleTosat("An error accourd on sending reset password email to '"+this.user.email+"'.")
      }
    }
    else
    {
      this.errorProvider.simpleTosat("Email is not valid.")
    }
  }
}

