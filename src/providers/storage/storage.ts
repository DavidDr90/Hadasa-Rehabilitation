import {AngularFireStorage} from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { AutenticationProvider } from '../autentication/autentication';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  //float of uploaded percentage.
  public uploadPercentage;
  public downloadURL;

  constructor(private storage: AngularFireStorage, private auth : AutenticationProvider) {
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
      const task = this.storage.upload(storage_path ,file.item(0));
      task.percentageChanges().subscribe( a =>
        {
          
          this.uploadPercentage = Math.round(a);

          if (this.uploadPercentage == 100)
          {
            return task.downloadURL().subscribe(URL => {
              console.log("Uploaded successfully, can be found at: "+URL);
              return URL;
              // return URL;
            });
         
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