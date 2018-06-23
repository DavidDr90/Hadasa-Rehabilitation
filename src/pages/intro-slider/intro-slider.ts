import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { MyApp } from '../../app/app.component';
import { User } from '../../models/user';
import { ErrorProvider } from '../../providers/error/error';
import { OurAppPage } from '../our-app/our-app';


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

  public async logIn() {
    let connection = await this.authentication.checkConnection()
    if (connection["connected"] != true) {
      this.errorProvider.simpleToast(this.authentication.NO_INTERNET_CONNECTION_MESSAGE)
      return
    }
    if (!this.authentication.checkEmailValidity(this.user.email)) {
      this.errorProvider.simpleToast(this.authentication.EMAIL_NOT_VALID_MESSAGE)
      return
    }
    if (!this.authentication.checkPasswordValidity(this.user.password)) {
      this.errorProvider.simpleToast(this.authentication.PASSWORD_NOT_VALID_MESSAGE)
      return
    }

    let logged_in = await this.authentication.signIn(this.user.email, this.user.password).then(
      success => {
        if (this.authentication.afAuth.auth.currentUser) {
          //Checks if the user email verified. If it is not verified stay the user in this page.
          if (!this.authentication.afAuth.auth.currentUser.emailVerified) {
            this.errorProvider.simpleToast(this.authentication.SHOULD_VERIFY_MESSAGE);
            // this.navCtrl.setRoot(IntroSliderPage);
            this.authentication.logOut();
          }
        }
      },
      failed => {
        this.errorProvider.simpleToast(this.authentication.EMAIL_OR_PASSWORD_WRONG_MESSAGE)
      }).catch(
        error => {
          this.errorProvider.simpleToast(this.authentication.EMAIL_OR_PASSWORD_WRONG_MESSAGE)
        }
      )
  }




  public async register() {

    let connection = await this.authentication.checkConnection()
    if (connection["connected"] != true) {
      this.errorProvider.simpleToast(this.authentication.NO_INTERNET_CONNECTION_MESSAGE)
      return
    }

    if (!this.authentication.checkEmailValidity(this.user.email)) {
      this.errorProvider.simpleToast(this.authentication.EMAIL_NOT_VALID_MESSAGE)
      return
    }

    if (!this.authentication.checkPasswordValidity(this.user.password)) {
      this.errorProvider.simpleToast(this.authentication.PASSWORD_NOT_VALID_MESSAGE)
      return
    }
    let registered = this.authentication.registerNewUser(this.user.email, this.user.password);
    registered.then(
      success => {
        this.authentication.afAuth.auth.currentUser.sendEmailVerification().then(
          (send_mail_success) => {
            // this.errorProvider.simpleToast(this.authentication.SHOULD_VERIFY_MESSAGE)
            let wait_promise = this.errorProvider.waitAlert("אימות אימייל", this.authentication.SHOULD_VERIFY_MESSAGE)
            wait_promise.then(async () => {
              await this.authentication.getCurrentUser.reload()
              this.authentication.getCurrentUser.getToken(true)
            })
          },
          (send_mail_failed) => {
            this.errorProvider.simpleToast(this.authentication.ERROR_SENDING_VERIFY_MESSAGE)
          })
      },
      failed => {
        this.errorProvider.simpleToast(this.authentication.EMAIL_ALREADY_EXISTS_MESSAGE)
      }).catch(
        error => {
          this.errorProvider.simpleToast(this.authentication.EMAIL_ALREADY_EXISTS_MESSAGE)
        }
      )
  }





  public async resetPassword() {

    let connection = await this.authentication.checkConnection()
    if (connection["connected"] != true) {
      this.errorProvider.simpleToast(this.authentication.NO_INTERNET_CONNECTION_MESSAGE)
      return
    }

    if (this.authentication.checkEmailValidity(this.user.email)) {
      let promise = this.authentication.resetPassword(this.user.email);
      promise.then(
        success => {
          this.errorProvider.simpleToast(this.authentication.RESET_PASSWORD_SUCCESS_MESSAGE)
        },
        failed => {
          this.errorProvider.simpleToast(this.authentication.EMAIL_DOESNT_EXISTS_MESSAGE)

        })
    }
    else {
      this.errorProvider.simpleToast(this.authentication.EMAIL_NOT_VALID_MESSAGE)
    }
  }

  aboutApp() {
    const myModal = this.modal.create(OurAppPage);

    myModal.present();
  }

}

