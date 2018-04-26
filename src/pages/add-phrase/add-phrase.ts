import { Component, ViewChild } from '@angular/core';
import { IonicPage, ActionSheetController, ViewController } from 'ionic-angular';
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


enum ImageOptions {
  CAMERA = 1,
  GALLERY,
  SEARCH
}

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

  //varibales for the record
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  constructor(private _formBuilder: FormBuilder,
    private _camera: Camera,
    private _actionSheetCtrl: ActionSheetController,
    private _viewCtrl: ViewController,
    // private _mediaCapture: MediaCapture,
    private _alertCtrl: AlertController,
    // private _media: Media,
    private media: Media,
    private file: File,
    public platform: Platform) {

    this._myForm = this._formBuilder.group({
      "text": ['', Validators.required],//the phrase
      "categoryID": ['', Validators.required],//the associated category
      "imagePath": ['', Validators.required],//the path to the pharse's image
      "audioFile": ['', Validators.required],//the path to the phrase's audio file
    })
  }

  ionViewDidLoad() {

  }

  public get getNikud() {
    return this._nikudArray;
  }

  updateNeedNikud(){
    alert(this._needNikud);
    this._needNikud = !this._needNikud;
  }
  
  public get getNeedNikud() : boolean {
    return this._needNikud;
  }
  

  /**When press the 'אישור' button send the new form object to the phrase class
   * and then save the new phrase on the serve
   */
  onSubmit() {
    // use the form object to create new phares object and add it to the server
    if (!this._myForm.valid) { return; }
    this._viewCtrl.dismiss(this._myForm.value);//return the nw object
  }


  // The following is the image handler functions
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
          text: 'מצלמה',
          icon: 'camera',
          handler: () => {
            console.log('camera');
            this.getPicture(ImageOptions.CAMERA);
          }
        },
        {
          text: 'גלריה',
          icon: 'images',
          handler: () => {
            console.log('gallery');
            this.getPicture(ImageOptions.GALLERY);
          }
        },
        {
          text: 'חיפוש ברשת',
          icon: 'logo-google',
          handler: () => {
            console.log('search on line');
            this.getPicture(ImageOptions.SEARCH);
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

  //check all the next functions
  getPicture(from: any) {
    let cameraOptions;

    switch (from) {
      case ImageOptions.CAMERA:
        if (Camera['installed']()) {//if there is a camera install in this device
          console.log("camera install!");
          cameraOptions = {
            sourceType: this._camera.PictureSourceType.CAMERA,
            destinationType: this._camera.DestinationType.DATA_URL,
            targetWidth: 96,
            targetHeight: 96,
            encodingType: this._camera.EncodingType.JPEG,
            correctOrientation: true
          }
          break;
        }
      //if there is NOT a camera on this device
      case ImageOptions.GALLERY:

        // cameraOptions = {
        //   sourceType: this._camera.PictureSourceType.PHOTOLIBRARY,
        //   destinationType: this._camera.DestinationType.DATA_URL,
        //   quality: 100,
        //   targetWidth: 1000,
        //   targetHeight: 1000,
        //   encodingType: this._camera.EncodingType.JPEG,
        //   correctOrientation: true
        // }

        //if there is NOT camera on this device go to the file maneger to look for an image
        this.fileInput.nativeElement.click();
        break;

      case ImageOptions.SEARCH:
        //go to google search with the input text if there is...
        break;
      default:
        break;
    }


    this._camera.getPicture(cameraOptions).then((data) => {
      /* TODO:
        use the google URL shorter to make the image url short before saving
        */
      this._myForm.patchValue({ 'imagePath': 'data:image/jpg;base64,' + data });//insert the capture image path to the form 
    }, (err) => {
      console.log(err);
    })

  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this._myForm.patchValue({ 'imagePath': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this._myForm.controls['imagePath'].value + ')'
  }

  ionViewWillEnter(){
    this.getAudioList();//display the audio file list
  }


  /*  all the record function should be tested in on an android or iOS emulator or device */

  //return the audio files list from the loacl storage
  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  //start the record
  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  //stop the record and save the audio file on local storage
  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  //play the input audio file
  playAudio(file) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
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


  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this._viewCtrl.dismiss();
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
  getCaretPos(e) {
    this._curserPosition = e.target.selectionStart;//save the curser place in the text
  }

}
