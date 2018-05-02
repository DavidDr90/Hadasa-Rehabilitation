import { Injectable } from '@angular/core';
import { MediaObject, Media } from '@ionic-native/media';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';


@Injectable()
export class AudioRecordProvider {

  audioFilePath: string;
  fileName: string;
  audio: MediaObject;
  firstTime: boolean = true;

  constructor(private media: Media,
    public platform: Platform,
    private file: File,
    private filePath: FilePath) {

  }

  /********* The following are the voice record handler functions ************/
  /*  all the record function should be tested on an android or iOS emulator or device */

  //start the record
  startRecord() {
    try {
      if (this.platform.is('ios')) {
        this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
        this.audioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.audioFilePath);
      } else if (this.platform.is('android')) {
        this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
        this.audioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.audioFilePath);
      }
      this.audio.startRecord();
    }
    catch (error) {
      throw error;
    }
  }

  //stop the record and save the audio file on local variable
  stopRecord(): any {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    return data;
  }

  /** play the input file on the device speakers
   * @param file - an input audio file to play
   */
  playAudio(file) {
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
      this.audio.play();
      this.audio.setVolume(0.8);
    } catch (error) {
      throw error;
    }
  }

  stopAudio(file) {
    try {
      this.audio.pause();
    } catch (error) {
      throw error;
    }
  }

}
