import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Phrase, holidays } from '../../Mock/phrase.mock';
import { NativeAudio } from '@ionic-native/native-audio';


@IonicPage()
@Component({
  selector: 'page-mock-test',
  templateUrl: 'mock-test.html',
})
export class MockTestPage {


  phr: Phrase[] = holidays;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private nativeAudio: NativeAudio) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MockTestPage');
  }

  //play the input audio file
  playAudio(audioFile){
    this.nativeAudio.preloadSimple('file', audioFile);
    this.nativeAudio.play('file');
  }
  
  

}
