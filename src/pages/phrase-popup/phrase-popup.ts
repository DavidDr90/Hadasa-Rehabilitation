import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
//for the recorder functions
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

/**
This is the page that pops onscreen when phrase is clicked
has the phrase itself
the image 
and the audio playable by button click
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
  //varibales for the record
  private playing: boolean = false;
  private audioFilePath: string;
  private audio: MediaObject;
  private firstTime: boolean = true;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      private alertCtrl: AlertController,
      /* media providers for playing audio */
      private media: Media,
      public platform: Platform,
      private file: File){

    this.phraseName = this.navParams.get("phraseName");
    this.phraseImageURL = this.navParams.get("phraseImageURL");

    //TODO use this when audio is implemented in phrase model
    //this.phraseAudioURL = this.navParams.get("phraseAudioURL");
    this.phraseAudioURL = "../assets/audio/Holidays/kipor.mp3"//for testing
  } 
  
  //clicked the button, play audio
  private clicked(){
    this.playAudio(this.phraseAudioURL);   
  }

    /** play the input file on the device speakers
   * @param file - an input audio file to play
   */
   private playAudio(file) {
    try {
      if (this.firstTime) {//enter this if only the first time
        if (this.platform.is('ios')) {
          this.audioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
          this.audio = this.media.create(this.audioFilePath);
        } else if (this.platform.is('android')) {
          this.audioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
          this.audio = this.media.create(this.audioFilePath);
        }
      }
      this.firstTime = false;
      this.playing = true;
      this.audio.play();
      this.audio.setVolume(0.8);
    } catch (error) {
      let alert = this.alertCtrl.create({
        title: 'problem with audio',
        subTitle: error,
        buttons: ['sorry']
      });
      alert.present();
    }
  }

}
