import { AngularFireStorage } from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { AutenticationProvider } from '../autentication/autentication';
import * as firebase from 'firebase';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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

  /* This function called from file browser with an event of calling
   * And uploads the selected file to the storage.
   *
   * any other file -> file not supported
   * Gets: Event of select file.
   * Returns: 
   *      On success: Path to uploaded file (web-path). 
   *            * any image file to <User_mail>/<images>/<file_name>
   *            * any audio file to <User_mail>/<audios>/<file_name>
   * 
   *      On error: an empty string. ("").
   * 
   *
   * 
   * TODO: Should add error-dialog and percentage bar to the user.
  */

  /* This function called from the add-phrase form (you can use it from different pages also).
   * The functions gets:
   * path: The native path of the fine on the device.
   * type: The type of the file (Example: 'data:audio/mp3;base64' for audio file)
   * form: form object (Not nessecary if you dont want to use). - default is NULL.
   * The form value just updates the file object string.
   * 
   * How does it work?
   * This function checks if the type is image, if it is then it uploads it to
   * <email>/images/<name_of_file>.jpg on the storage.
   * same with audio file.
   * 
   * This function also updates the progress of the upload 
   * for each image and audio seperatly.
   */
  public uploadFileByPath(path, type) {

    let user = this.authentication.afAuth.auth.currentUser.email
    let user1 = this.authentication.user.email;

    //if the file is an image file
    if (type.includes("image")) {
      this.imageUploadPercentage = 0
      const imageFolder = "/images/";
      let storage_path = user + imageFolder + this.createFileName() + ".jpg";//create the path on the storage

      this.image_ref = firebase.storage().ref(storage_path);

      let task = this.image_ref.putString(type + path, "data_url").then(url => {
        //Updates the image-progress
        let current_percent = (url.task.snapshot.bytesTransferred / url.task.snapshot.totalBytes) * 100;
        this.imageUploadPercentage = Math.round(+current_percent)


        //TODO: make this function return the new url
        let imageUrl = url.downloadURL;
        console.log(imageUrl);
        return imageUrl;



        /*
        this.imageDownloadURL = url.task.snapshot.downloadURL;
        console.log(this.imageDownloadURL);
       */



      })

    }
    //if the file is an audio file
    else if (type.includes("audio")) {
      this.audioUploadPercentage = 0
      const audioFolder = "/audio/";

      let storage_path = user + audioFolder + this.createFileName() + ".mp3";//create the path on the storage

      const task = firebase.storage().ref(storage_path).putString(type + path, "data_url")
        .then(url => {
          //Updates the audio-progress
          let current_percent = (url.task.snapshot.bytesTransferred / url.task.snapshot.totalBytes) * 100;
          this.audioUploadPercentage = Math.round(+current_percent)


          //TODO: make this function return the url
          this.audioDownloadURL = url.downloadURL;
          console.log(this.audioDownloadURL);
          return this.audioDownloadURL;

          /*
          this.audioDownloadURL = url.task.snapshot.downloadURL
          console.log(this.audioDownloadURL);
          */

        });

    }

    else {
      console.log("ERROR UPLOADING - UNKNOWN TYPE OF FILE");

    }
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

}