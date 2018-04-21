import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Phrase} from "../../models/Phrase"

@IonicPage()
@Component({
  selector: 'page-phrases',
  templateUrl: 'phrases.html'
})
export class PhrasesPage {
  
  phrases = [
    new Phrase("השם שלי","../assets/imgs/name.png"),
    new Phrase("הכתובת שלי","../assets/imgs/home.png"),
    
]
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad PhrasesPage');
  }

}
