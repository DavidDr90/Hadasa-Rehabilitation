import { Component, ViewChild } from '@angular/core';
import { IonicPage, ActionSheetController, ViewController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as Enums from '../../consts/enums';
import { HTTP } from '@ionic-native/http';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { AlertController } from 'ionic-angular';

//for the recorder functions
import { NavController, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';


enum ImageOptions {
  CAMERA = 1,
  GALLERY,
  SEARCH
}


declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-phrase',
  templateUrl: 'add-phrase.html',
})
export class AddPhrasePage {
  @ViewChild('fileInput') fileInput;

  private _myForm: FormGroup;
  private _curserPosition;
  private _nikudArray = Enums.NIKUD;
  private _needNikud = false;

  lastImage: string = null;

  //varibales for the record
  recording: boolean = false;
  audioFilePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  audioFile: any;

  constructor(private _formBuilder: FormBuilder,
    private _actionSheetCtrl: ActionSheetController,
    private _viewCtrl: ViewController,
    private _alertCtrl: AlertController,
    private camera: Camera,

    /* media provider for the record methods */
    private media: Media,
    public platform: Platform,
    private file: File,
    private filePath: FilePath) {

    //create the form object with the required fileds
    this._myForm = this._formBuilder.group({
      "text": ['', Validators.required],//the phrase
      "categoryID": ['', Validators.required],//the associated category
      "imagePath": ['', Validators.required],//the path to the pharse's image
      "audioFile": ['', Validators.required],//the path to the phrase's audio file
    })
  }

  ionViewDidLoad() { }

  /** @returns the nikud array
   */
  public get getNikud() {
    return this._nikudArray;
  }

  /** display and alert on the screen with the input valuse
   * @param headLine the head line for the alert display
   * @param message the message that will display
   */
  showAlert(headLine: string, message: string) {
    let alert = this._alertCtrl.create({
      title: headLine,
      subTitle: message,
      buttons: ['אישור']
    });
    alert.present();
  }

  /**this function tack the input text from the 'text' input and add to it the proper 'nikud'
   * @param nikud the nikud symbol on the clicked button 
   */
  addNikudToText(nikud: string) {
    let temp: string;
    let str = "";
    temp = this._myForm.controls['text'].value;//get the input value

    //insert the nikud in the right position
    str += temp.substring(0, this._curserPosition);
    str += nikud;
    str += temp.substring(this._curserPosition, temp.length);

    this._myForm.controls['text'].setValue(str);//insert the new value to the input box
  }

  /**get the curser position
   * @param e the event from the html DOM
   */
  private getCaretPos(e) {
    this._curserPosition = e.target.selectionStart;//save the curser place in the text
  }

  /**
  * The user cancelled, so we dismiss without sending data back.
  */
  cancel() {
    this._viewCtrl.dismiss();
  }

  /**When press the 'אישור' button send the new form object to the phrase class
   * and then save the new phrase on the serve
   */
  onSubmit() {
    // use the form object to create new phares object and add it to the server
    // if (!this._myForm.valid) { return; }
    // this._viewCtrl.dismiss(this._myForm.value);//return the new object
  }

  /**present Action Sheet when press the add button
   * let the user choose from where to get the image
   * the user have three options:
   * 1. from the build in camera
   * 2. from the device picture gallery
   * 3. from google with an online seaech
   */
  presentActionSheet() {
    let actionSheet = this._actionSheetCtrl.create({
      title: 'בחר מקור לתמונה',
      buttons: [
        {
          text: '\xa0\xa0 מצלמה',
          icon: 'camera',
          handler: () => {
            console.log('camera');
            // this.getPicture(ImageOptions.CAMERA);
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '\xa0\xa0גלריה',
          icon: 'images',
          handler: () => {
            console.log('gallery');
            // this.getPicture(ImageOptions.GALLERY);
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '\xa0\xa0חיפוש ברשת',
          icon: 'logo-google',
          handler: () => {
            console.log('search on line');
            //  connect to alex's google custom image search with the input text
          }
        },

        {
          text: 'ביטול',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  /********* The following are the image handler functions ************/

  /**define the native camera oprtion from the givven input
   * then call the getPicture() method with the option
   * @param sourceType - from where to get the image, the camera or the gallery
   * dispaly an error window on fialure
   */
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.showAlert("לא הצלחנו לבחור תמונה....", err);
    });
  }

  // Create a new name for the image from the current time
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.showAlert("לא הצלחנו לשמור את התמונה....", error);
    });
  }

  /** add the path to the form filed 
   * @param img - the path to the image 
   * @returns the path to the image to display on the screen
   */
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      this._myForm.patchValue({ 'imagePath': cordova.file.dataDirectory + img });//insert the capture image path to the form 
      return cordova.file.dataDirectory + img;
    }
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
      console.log("before start record");
      this.audio.startRecord();
      this.recording = true;
    }
    catch (error) {
      this.showAlert("לא הצלחנו לבצע הקלטה....", error);
    }
  }

  //stop the record and save the audio file on local storage
  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioFile = data;
    this._myForm.patchValue({ 'audioFile': this.audioFile });//insert the capture audio file to the form 
    this.recording = false;
  }

  //play the input audio file
  playAudio(file) {
    try {
      if (this.platform.is('ios')) {
        this.audioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.audioFilePath);
      } else if (this.platform.is('android')) {
        this.audioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.audioFilePath);
      }
      this.audio.play();
      this.audio.setVolume(0.8);
    } catch (error) {
      this.showAlert("לא הצלחנו להשמיע את הקלטה....", error);
    }
  }

}
