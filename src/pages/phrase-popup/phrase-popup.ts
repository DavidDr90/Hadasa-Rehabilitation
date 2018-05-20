import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PhrasePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phrase-popup',
  templateUrl: 'phrase-popup.html',
})
export class PhrasePopupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhrasePopupPage');
  }

  //go back to the page that called this popup
  private back(){
    this.navCtrl.pop(); 
  }

}
