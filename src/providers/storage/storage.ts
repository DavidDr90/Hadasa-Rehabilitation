import {AngularFireStorage} from 'angularfire2/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AutenticationProvider } from '../autentication/autentication';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  public uploadPercentage;

  constructor(private storage: AngularFireStorage, private auth : AutenticationProvider) {
    this.uploadPercentage = 0;
  }

  /* This function called from file browser with an event of calling
   * And uploads the selected file to the storage.
   *
   * TODO: Should add error-dialog and percentage bar to the user.
  */
 public uploadFile(event)
 {    
   try
   {
   const file = event.target.files;
   var folder_name = ""
   const type = file.item(0).type 
   if(type.startsWith("image/"))
         folder_name = "/images/"
   
   else if(type.startsWith("audio/"))
        folder_name = "/audios/"

  else
  {
    console.log("File not supported "); 
    return ""
  }

   const storage_path =  this.auth.user.email + folder_name + file.item(0).name

   const task = this.storage.upload(storage_path ,file.item(0));
   task.percentageChanges().subscribe( a =>
   {
     this.uploadPercentage = a;
     if (this.uploadPercentage == 100)
     {
       console.log("Uploaded successfully.");
       return storage_path
     }
   });
   }
   catch(e)
   {
     console.log("Uploading file failed: ",e.message); 
   }
 }

}