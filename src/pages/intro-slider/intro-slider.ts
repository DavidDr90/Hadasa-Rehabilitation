import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginProvider } from '../../providers/login/login'
import { AutenticationProvider } from '../../providers/autentication/autentication';


/**
 * Generated class for the IntroSliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro-slider',
  templateUrl: 'intro-slider.html',
})
export class IntroSliderPage {
  homePage = HomePage;
  //allows to access its childeren (individual slides)
  @ViewChild(Slides) slides:Slides; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public login: LoginProvider, public authentication: AutenticationProvider) {
    this.checkIfDataLoaded();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroSliderPage');

  }

  //update the flag in the provider
  logIn(){
    this.login.loginStatus = true;
    alert("login succesful, flag updated");
  }

  public checkIfDataLoaded() 
  {
    return new Promise((resolve, reject) => 
    {
        if (this.authentication.isLoggedIn()) 
        {
          console.log('user is logged in');
          this.navCtrl.push(HomePage);
            resolve(true);
        } else 
        {
            resolve(false);
        }
    });
}

}
