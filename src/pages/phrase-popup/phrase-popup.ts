import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//for the recorder functions
import { Media, MediaObject } from '@ionic-native/media';
import { ErrorProvider } from '../../providers/error/error';

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
  private audio: MediaObject;
  private windowClosed: boolean = false;
  private isIOS: boolean = false;
  private audioUrlIsEmpty: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private errorProvider: ErrorProvider,
    /* media providers for playing audio */
    private media: Media,
    private platform: Platform) {

    //if the platform is iOS display the nav bar
    if (platform.is('ios'))
      this.isIOS = true;
    else
      this.isIOS = false;

    this.phraseName = this.navParams.get("phraseName");
    this.phraseImageURL = this.navParams.get("phraseImageURL");
    this.phraseAudioURL = this.navParams.get("phraseAudioURL");
    
    this.playAudio(this.phraseAudioURL);

    /**handle the minimize events
     * stop when the app is minimize
     */
    document.addEventListener("pause", () => {
      this.audio.stop();
    }, false);
  }

  /** play the input file on the device speakers
 * @param url - an input audio file to play
 */
  private playAudio(url) {

    //if we have no audio, whait few sec and pop
    if (url == null || url == "" || url == undefined) {
      this.audioUrlIsEmpty = true;
      setTimeout( () => {
        this.navCtrl.pop()
      }, 1500)//display for a decent time, 1.5 seconds for now
    }

    try {
      this.audio = this.media.create(url);

      this.audio.onStatusUpdate.subscribe(status => {
        if (status.toString() == "1") { //player start
          console.log("start playing");
        }
        if (status.toString() == "4") { // player end running
          console.log("player stopped");
          if (!this.windowClosed) {
            if (this.platform.is('android'))
              this.audio.release();//free audio resources after playback (android)
            this.navCtrl.pop();
          }
        }
      });
    } catch (err) {
      this.errorProvider.simpleTosat(err);
    }

    try {
      this.audio.play()
    }
    catch (ex) {
      this.errorProvider.simpleTosat(ex);
      if (this.platform.is('android'))
        this.audio.release();//free audio resources after playback (android)
      this.navCtrl.pop();
    }
  }

  //make sure to close the audio when the page is closed
  ionViewDidLeave() {
    this.windowClosed = true;
    if (!this.audioUrlIsEmpty) {
      this.audio.pause();
      if (this.platform.is('android'))
        this.audio.release();
    }
  }

}
