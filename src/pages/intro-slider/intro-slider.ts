import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { LoginProvider } from '../../providers/login/login'


/**
 * Generated class for the IntroSliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro-slider',
  templateUrl: 'intro-slider.html'
})
export class IntroSliderPage {
  tabsPage = TabsPage;
  //allows to access its childeren (individual slides)
  @ViewChild(Slides) slides:Slides; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public login: LoginProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroSliderPage');
  }

  //update the flag in the provider
  logIn(){
    this.login.loginStatus = true;
    alert("login succesful, flag updated");
    this.navCtrl.push(this.tabsPage);
  }

}
