import { AngularFireStorage } from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { AutenticationProvider } from '../autentication/autentication';
import * as firebase from 'firebase';


@Injectable()
export class StorageProvider {

  //float of uploaded percentage.
  public imageUploadPercentage;
  public audioUploadPercentage;

  public image_ref;
  public imageDownloadURL;
  public audioDownloadURL

  constructor(private storage: AngularFireStorage, public authentication: AutenticationProvider, ) {
    this.imageUploadPercentage = 0;
    this.audioUploadPercentage = 0;

  }

  /** This function called from the add-phrase form (you can use it from different pages also).
   * How does it work?
   * This function checks if the type is image, if it is then it uploads it to
   * <email>/images/<name_of_file>.jpg on the storage.
   * same with audio file.
   * 
   * This function also updates the progress of the upload 
   * for each image and audio seperatly.
   * 
   * @param path The native path of the fine on the device.
   * @param type The type of the file (Example: 'data:audio/mp3;base64' for audio file)
   * @returns a new promise with the new url, on error - undefine
   */
  public uploadFileByPath(path, type) {
    return new Promise((resolve, reject) => {
      let user = this.authentication.afAuth.auth.currentUser.email

      //if the file is an image file
      if (type.includes("image")) {
        this.imageUploadPercentage = 0
        const imageFolder = "/images/";
        let storage_path = user + imageFolder + this.createFileName() + ".jpg";//create the path on the storage

        this.image_ref = firebase.storage().ref(storage_path);

        let task = this.image_ref.putString(type + path, "data_url")

        task.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => {

            this.imageUploadPercentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          }
        );

        task.then(url => {
          this.imageDownloadURL = url.downloadURL;
          resolve(this.imageDownloadURL)

        })

      }
      //if the file is an audio file
      else if (type.includes("audio")) {
        this.audioUploadPercentage = 0
        const audioFolder = "/audio/";

        console.log("======== in storgage: path " + path);
        console.log("======== in storgage: type " + type);

        let storage_path = user + audioFolder + this.createFileName() + ".mp3";//create the path on the storage
        const task = firebase.storage().ref(storage_path).putString(type + path, "data_url")

        task.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => {
            this.audioUploadPercentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          }
        );

        task.then(async url => {
          console.log("======== in storgage: url " + url);
          this.audioDownloadURL = url.downloadURL;
          resolve(this.audioDownloadURL)
        });


      }

      else {
        console.log("ERROR UPLOADING - UNKNOWN TYPE OF FILE");
        reject("null")
      }
    })
  }

  //this function creates random file-name (without extention) based on time.
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n;
    return newFileName;
  }


  public getImagePercentage() {
    return this.imageUploadPercentage;
  }

  public getAudioPercentage() {
    return this.audioUploadPercentage;
  }

  public showImageProgressBar() {
    if (this.imageUploadPercentage == 0 || this.imageUploadPercentage == 100)
      return false;
    return true;
  }

  public showAudioProgressBar() {
    if (this.audioUploadPercentage == 0 || this.audioUploadPercentage == 100)
      return false;
    return true;
  }

}