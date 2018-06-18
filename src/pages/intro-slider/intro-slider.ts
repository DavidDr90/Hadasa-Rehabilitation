import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { MyApp } from '../../app/app.component';
import { AboutMeFormPage } from '../about-me-form/about-me-form';
import { User } from '../../models/user';
import { ErrorProvider } from '../../providers/error/error';
import { OurAppPage } from '../our-app/our-app';
import * as firebase from 'firebase/app';


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
    this.authentication.checkConnection();
    this.loading_sign = false;
    this.authentication.initApp();


  }

  ionViewDidLoad() {
  }



  public async logIn() {
    let connection = await this.authentication.checkConnection()
    debugger
    if(connection["connected"] != true)
    {
      this.errorProvider.simpleTosat(this.authentication.NO_INTERNET_CONNECTION_MESSAGE)
      return
    }
    if (!this.authentication.checkEmailValidity(this.user.email)) {
      this.errorProvider.simpleTosat(this.authentication.EMAIL_NOT_VALID_MESSAGE)
      return
    }
    if (!this.authentication.checkPasswordValidity(this.user.password)) {
      this.errorProvider.simpleTosat(this.authentication.PASSWORD_NOT_VALID_MESSAGE)
      return
    }

    let logged_in = await this.authentication.signIn(this.user.email, this.user.password).then(
      success => {
        if (this.authentication.afAuth.auth.currentUser) {
          //Checks if the user email verified. If it is not verified stay the user in this page.
          if (!this.authentication.afAuth.auth.currentUser.emailVerified) {
            this.errorProvider.simpleTosat(this.authentication.SHOULD_VERIFY_MESSAGE);
            // this.navCtrl.setRoot(IntroSliderPage);
            this.authentication.logOut();
          }
        }
      },
      failed => {
        this.errorProvider.simpleTosat(this.authentication.EMAIL_OR_PASSWORD_WRONG_MESSAGE)
      }).catch(
        error =>
        {
          this.errorProvider.simpleTosat(this.authentication.EMAIL_OR_PASSWORD_WRONG_MESSAGE)
        }
      )
  }
  



  public async register() {

      let connection = await this.authentication.checkConnection()
      debugger
      if(connection["connected"] != true)
      {
        this.errorProvider.simpleTosat(this.authentication.NO_INTERNET_CONNECTION_MESSAGE)
        return
      }

      if (!this.authentication.checkEmailValidity(this.user.email)) {
          this.errorProvider.simpleTosat(this.authentication.EMAIL_NOT_VALID_MESSAGE)
          return
        }

      if (!this.authentication.checkPasswordValidity(this.user.password)) {
        this.errorProvider.simpleTosat(this.authentication.PASSWORD_NOT_VALID_MESSAGE)
        return
      }
      let registered = this.authentication.registerNewUser(this.user.email, this.user.password);
      registered.then(
        success => {
          this.authentication.afAuth.auth.currentUser.sendEmailVerification().then(
            (send_mail_success) =>
            {
              // this.errorProvider.simpleTosat(this.authentication.SHOULD_VERIFY_MESSAGE)
              let wait_promise = this.errorProvider.waitAlert("אימות אימייל", this.authentication.SHOULD_VERIFY_MESSAGE)
              wait_promise.then(async () => {
                await this.authentication.getCurrentUser.reload()
                this.authentication.getCurrentUser.getToken(true)
              })
            },
            (send_mail_failed) =>
            {
              this.errorProvider.simpleTosat(this.authentication.ERROR_SENDING_VERIFY_MESSAGE)
            })         
        },
        failed => 
        {
          this.errorProvider.simpleTosat(this.authentication.EMAIL_ALREADY_EXISTS_MESSAGE)
        }).catch(
          error =>
          {
            this.errorProvider.simpleTosat(this.authentication.EMAIL_ALREADY_EXISTS_MESSAGE)
          }
        )
    }


  


  public async resetPassword() {

    let connection = await this.authentication.checkConnection()
    debugger
    if(connection["connected"] != true)
    {
      this.errorProvider.simpleTosat(this.authentication.NO_INTERNET_CONNECTION_MESSAGE)
      return
    }

    if (this.authentication.checkEmailValidity(this.user.email)) {
      let promise = this.authentication.resetPassword(this.user.email);
      promise.then(
        success => {
          this.errorProvider.simpleTosat(this.authentication.RESET_PASSWORD_SUCCESS_MESSAGE)
        },
        failed => {
          this.errorProvider.simpleTosat(this.authentication.EMAIL_DOESNT_EXISTS_MESSAGE)

        })
    }
    else {
      this.errorProvider.simpleTosat(this.authentication.EMAIL_NOT_VALID_MESSAGE)
    }
  }

  aboutApp() {
    const myModal = this.modal.create(OurAppPage);

    myModal.present();
  }


  // This function called by clicking login-button.
  // public async logIn() {

  //   if (this.authentication.checkEmailValidity(this.user.email)) {
  //   // this.loading_sign = true;
  //   // The function toggleSignIn will connect the user with redirect-auth.
  //   // let promise = this.authentication.toggleSignIn(this.user);
  //   let logged_in = await this.authentication.signIn(this.user.email, this.user.password);
  //   if (this.authentication.afAuth.auth.currentUser) {
  //     //Checks if the user email verified. If it is not verified stay the user in this page.
  //     if (!this.authentication.afAuth.auth.currentUser.emailVerified) {
  //       this.errorProvider.simpleTosat("You must verify your email before log-in.");
  //       this.navCtrl.setRoot(IntroSliderPage);
  //       this.authentication.logOut();
  //     }
  //   }
  //   else {
  //     this.errorProvider.simpleTosat(logged_in)
  //   }
  // }
  // else{
  //   this.errorProvider.simpleTosat("כתובת המייל שהוזנה איננה תקפה")
  // }
  // }


  // public register() {

  //   if (this.authentication.checkEmailValidity(this.user.email)) 
  //   {
  //   let registered = this.authentication.registerNewUser(this.user.email, this.user.password);
  //   let res = new Promise((resolve, reject) => {
  //     resolve(registered);
  //   });

  //   res.then((data) => {
  //     if (this.authentication.afAuth.auth.currentUser) {
  //       //Sends verification email when user register at first time.
  //       this.authentication.afAuth.auth.currentUser.sendEmailVerification();
  //     }
  //     //Toasts the register state. (success or fail).
  //     this.errorProvider.simpleTosat(data)

  //     let wait_promise = this.errorProvider.waitAlert("Verify Email","Please enter the link in your mail. Continue after you verified.")
  //     wait_promise.then(async ()=>
  //   {
  //     await this.authentication.getCurrentUser.reload()
  //     this.authentication.getCurrentUser.getToken(true)
  //   })

  //   });
  // }
  // else{
  //   this.errorProvider.simpleTosat("Email is not valid.")
  // }

  // }

  /** display to the user a page with information about the app
   *  this can be accsses without registertion
   */


}

