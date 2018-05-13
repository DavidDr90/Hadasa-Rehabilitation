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

    const task = this.storage.upload(this.auth.user.email + "/images/"+file.item(0).name ,file.item(0));
    task.percentageChanges().subscribe( a =>
    {
      this.uploadPercentage = a;
    });
    console.log("Uploaded successfully.");
    }
    catch(e)
    {
      console.log("Uploading file failed: ",e.message); 
    }
  }

}
