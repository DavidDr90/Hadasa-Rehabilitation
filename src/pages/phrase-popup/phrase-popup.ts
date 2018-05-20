import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  private phraseName: string;
  private phraseImageURL: string;
  private phraseAudioURL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController){
    this.phraseName = this.navParams.get("phraseName");
    this.phraseImageURL = this.navParams.get("phraseImageURL");

    //TODO use this when audio is implemented in phrase model
    //this.phraseAudioURL = this.navParams.get("phraseAudioURL");
  } 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhrasePopupPage');
  }

  //go back to the page that called this popup
  private back(){
    let alert = this.alertCtrl.create({
      title: this.navParams.get("phraseName"),
      buttons: ['fuck']
    });
    alert.present();
    //this.navCtrl.pop(); 
  }

}
