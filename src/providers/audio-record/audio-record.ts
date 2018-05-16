import { Injectable } from '@angular/core';
import { MediaObject, Media } from '@ionic-native/media';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';


@Injectable()
export class AudioRecordProvider {

  private audioFilePath: string;
  private fileName: string = "null";
  private audio: MediaObject;
  private firstTime: boolean = true;

  constructor(private media: Media,
    public platform: Platform,
    private file: File,
    private filePath: FilePath) {

  }

  /********* The following are the voice record handler functions ************/
  /*  all the record function should be tested on an android or iOS emulator or device */

  /**start the record session
   * check on whitch platfrom the app is runing and use the local storage to host the new file
   * @returns on successe return the new audio file name
   *          on failure return Error object with the error message
   */
  startRecord() : any {
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
      let data = new Error('fileName = ' + this.fileName + "<br/>" +
        ' audioFilePath = ' + this.audioFilePath + "<br/>" + 
        ' audio = ' + this.audio);
      this.audio.startRecord();
      return this.fileName;
    }
    catch (error) {
      return new Error(error);
    }
  }

  /** stop the record 
   * @return true on successful stop, on failure return Error Object
   */
  stopRecord(): any {
    try {
      this.audio.stopRecord();
      return true;
    } catch (error) {
      return new Error(error);
    }
  }

  /*  TODO: for now its play only a file that already place on the device
          need to check how to play an audio file from the server */

  /** play the input file on the device speakers
   * @param file - an input audio file to play
   */
  playAudio(file) {
    try {
      if (this.firstTime) {//enter this if only the first time
        //find the input file on the device storage
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

      let data = new Error('fileName = ' + this.fileName + "</br>" +
        ' audioFilePath = ' + this.audioFilePath + "</br>" + 
        ' audio = ' + this.audio);
      return data;
    } catch (error) {
      return new Error(error);
    }
  }

  /** stop a give audio file
   * @param file an input audio file to stop
   * @returns on failure return an Error object with the error message
   */
  stopAudio(file) {
    try {
      this.audio.pause();
    } catch (error) {
      return new Error(error);
    }
  }

}
