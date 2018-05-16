import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AudioRecordProvider } from '../../providers/audio-record/audio-record';
import { HttpProvider } from '../../providers/http/http';
import { VOICE_OPTIONS } from '../../consts/enums';

@IonicPage()
@Component({
  selector: 'page-about-me',
  templateUrl: 'about-me.html',
})
export class AboutMePage {
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }

  record: boolean = false;
  constructor(public audioProvider: AudioRecordProvider,
  public httpProvider:HttpProvider) {

  }
  ionViewDidLoad() {
  }

  data:any = new Error();
  playData:any = new  Error();

  text;

  start() {
    console.log("in start");
    this.data = this.audioProvider.startRecord();
    this.record = true;
  }

  stopRec = false;
  stop() {
    console.log("in stop");
    this.record = false;
    this.stopRec = this.audioProvider.stopRecord();
  }

  play(file){
    this.playData = this.audioProvider.playAudio(file);
  }



  send(){
    console.log("text = " + this.text);
    this.httpProvider.textToSpeech(this.text, VOICE_OPTIONS.SIVAN);
  }



}
