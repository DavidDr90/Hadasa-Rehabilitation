import { ErrorHandler, Inject } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

export class CustomErrorHandler implements ErrorHandler {
  constructor(
    @Inject(AlertController) private alerts: AlertController,
    @Inject(SplashScreen) public splashScreen: SplashScreen
  ) {}

  async handleError(error) {
    const alert = this.alerts.create({
      title: "...המערכת נתקלה בבעיה חמורה ועליה להסגר",
      subTitle: error,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'אתחל',
          handler: () => {
            this.splashScreen.show();
            window.location.reload();
          }
        }
      ]
    });
    alert.present();
  }
}