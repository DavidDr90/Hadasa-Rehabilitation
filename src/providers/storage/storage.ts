import {AngularFireStorage} from 'angularfire2/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AutenticationProvider } from '../autentication/autentication';
import { NgProgress } from 'ngx-progressbar';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  //float of uploaded percentage.
  public uploadPercentage;

  constructor(private storage: AngularFireStorage, private auth : AutenticationProvider, private ngProgress: NgProgress) {
    this.uploadPercentage = 0;
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
 public uploadFile(event)
 {   
   try
   {
      const file = event.target.files;
      var folder_name = ""
      //Gets the type of the file (images or audio)
      const type = file.item(0).type 

      if(type.startsWith("image/"))
            folder_name = "/images/"
      
      else if(type.startsWith("audio/"))
            folder_name = "/audios/"

      //If the file is not image or audio file 
      else
      {
        console.log("File not supported "); 
        return ""
      }

      const storage_path =  this.auth.user.email + folder_name + file.item(0).name
      this.ngProgress.start();
      // this.ngProgress.set(0);
      const task = this.storage.upload(storage_path ,file.item(0));
      task.percentageChanges().subscribe( a =>
        {
          
          this.uploadPercentage = a;
          console.log(this.uploadPercentage/100);
          
          this.ngProgress.set(this.uploadPercentage/100)
          if (this.uploadPercentage == 100)
          {
            this.ngProgress.done();
            console.log("Uploaded successfully.");
            return storage_path
          }
        });
     }

  catch(e)
   {
      console.log("Uploading file failed: ",e.message);
      return ""
   }
 }

 public getPercentage()
 {
   return this.uploadPercentage;
 }

}