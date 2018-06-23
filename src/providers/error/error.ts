import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


/**
 * Provider for handling commen error 
 * we should use this provider to show th user an error message
 */


const TOAST_DURATION = 4000//toast duration in milliseconds

@Injectable()
export class ErrorProvider {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  /** display a simple toast to the screen
   * the toast will be in the bottom of the screen and display for TOAST_DURATION
   * @param message the error message display to the user
   */
  public simpleToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: TOAST_DURATION,
      position: 'bottom',
    });
    toast.present();
  }

  /** display a short toast to the screen
   * the toast will be in the bottom of the screen and display for TOAST_DURATION/2
   * @param message the error message display to the user
   */
  public shortToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: (TOAST_DURATION/2),
      position: 'bottom',
    });
    toast.present();
  }

  /** display complex toast to the screen
   * the toast will be in the bottom of the screen and display for TOAST_DURATION
   * @param message  the error message display to the user
   * @param buttonText the text to disply on the button, the defulte is "סגור"
   */
  public toastWithButton(message, buttonText) {
    let toast;
    if ((buttonText != null) && (buttonText != undefined) && (buttonText != ""))
      buttonText = "סגור";

    toast = this.toastCtrl.create({
      message: message,
      duration: TOAST_DURATION,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: buttonText
    });
    toast.present();
  }

  /** display an alert dialog on the screen
   * the dialog close on user click
   * @param headline the alert headline display in big font
   * @param message the alert message to inform the user
   */
  public alert(headline, message) {
    let alert = this.alertCtrl.create({
      title: headline,
      subTitle: message,
      buttons: ['אישור']
    });
    alert.present();
  }


  public waitAlert(headline, message) : Promise<boolean> {
    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        title: headline,
        subTitle: message,
        buttons: [{
          text: 'OK',
          handler: () => {
            alert.dismiss().then(() => { resolve(true); });
            return false;
          }
        }]
      });

      alert.present();

    });
  }


}
