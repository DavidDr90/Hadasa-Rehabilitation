import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs'
import { HomePage } from '../home/home';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { MyApp } from '../../app/app.component';


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
  appPage = MyApp
  //allows to access its childeren (individual slides)
  @ViewChild(Slides) slides:Slides; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public authentication: AutenticationProvider) {
   // this.checkIfDataLoaded();
  }

  ionViewDidLoad() {

  }
  

  public async logIn()
  {
    let user = await this.authentication.createAuthentication();
    let temp = new Promise ((resolve,reject) => {
      resolve(user);
    });
   temp.then(()=>{ 
     console.log(this.authentication.user.displayName);
    this.navCtrl.setRoot(TabsPage);
  })
      
  }


}
