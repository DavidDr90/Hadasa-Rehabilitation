import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
//for the recorder functions
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

/**
This is the page that pops onscreen when phrase is clicked,
has the phrase itself,
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
      private file: MediaObject){

    this.phraseName = this.navParams.get("phraseName");
    this.phraseImageURL = this.navParams.get("phraseImageURL");
    this.phraseAudioURL = this.navParams.get("phraseAudioURL");

    //TODO use this when audio is implemented in phrase model
    //this.phraseAudioURL = this.navParams.get("phraseAudioURL");
    this.phraseAudioURL = "../assets/audio/Holidays/kipor.mp3"//for testing
  } 
  
  //clicked the button, play audio
  private clicked(){
    console.log("button clicked"); 
    this.playAudio(this.phraseAudioURL);   
  }

    /** play the input file on the device speakers
   * @param url - an input audio file to play
   */
   private playAudio(url) {

    //if we have no audio, whait few sec and pop
    if(url == null || url.toString.empty()){
      console.log("url is empty");  
      setTimeout( 
        this.navCtrl.pop(),
        3000
      )
    }


    //this.memoMedia = this.media.create(path);
    this.audio = this.media.create(url);

    this.audio.onStatusUpdate.subscribe(status => 
      { 

        if (status.toString()=="1") { //player start
          console.log("start playing"); 

        }

      if (status.toString()=="4") { // player end running
        console.log("player stopped"); 
          this.navCtrl.pop();
             
          
      }

  }); 

  try {
    this.audio.play()
  }
  catch (ex){
    console.log("errrrrror");
    console.error(ex);
  }
  

    //TODO file.release() to free audio resources after playback (android)
  }

}
