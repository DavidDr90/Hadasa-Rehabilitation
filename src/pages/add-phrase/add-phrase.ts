import { Component, ViewChild } from '@angular/core';
import { IonicPage, ActionSheetController, ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import * as Enums from '../../consts/enums';
import { AlertController } from 'ionic-angular';

//for the recorder functions
import { Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { HttpProvider } from '../../providers/http/http';
import { StorageProvider } from '../../providers/storage/storage';
import { AudioRecordProvider } from '../../providers/audio-record/audio-record';


declare var cordova: any;

const START_REC = "התחל הקלטה";
const STOP_REC = "עצור הקלטה";
const hebrewRegx = "[\u0590-\u05fe]+$";//regex for hebrew chars

@IonicPage()
@Component({
  selector: 'page-add-phrase',
  templateUrl: 'add-phrase.html',
})
export class AddPhrasePage {
  @ViewChild('myTimer') timer;

  private duration:any;
  private isCategory: boolean = true;
  private _myForm: FormGroup;
  private _curserPosition;
  private _nikudArray = Enums.NIKUD;
  private _needNikud = false;

  lastImage: string = null;
  micText = START_REC;

  //varibales for the record
  recording: boolean = false;
  playing: boolean = false;
  audioFilePath: string;
  fileName: string;
  audio: MediaObject;
  audioFile: any;
  firstTime: boolean = true;

  constructor(private _formBuilder: FormBuilder,
    private _actionSheetCtrl: ActionSheetController,
    private _viewCtrl: ViewController,
    private _alertCtrl: AlertController,
    private camera: Camera,
    private _audioRecordProvider: AudioRecordProvider,
    /* media provider for the record methods */
    private media: Media,
    public platform: Platform,
    private file: File,
    private filePath: FilePath,
    private httpProvider:HttpProvider,
    private storageProvider: StorageProvider,
    public navParams: NavParams,
    ) {


    //if we gote here from some categroy page and we want to add new phrase
    if (this.navParams.get('fromWhere') == Enums.ADD_OPTIONS.PHRASE) {
      this.isCategory = false;
    }

    //create the form object depend from where you arrived
    if (this.isCategory) {
      //create the form object with the required fileds
      this._myForm = this._formBuilder.group({
        "text": ['', [Validators.required,
        Validators.pattern(hebrewRegx),//the text must be hebrew text
        Validators.minLength(1)]],//the text must be more the one char
        "imagePath": ['', /*Validators.required*/],//the path to the pharse's image
        "audioFile": ['', /*Validators.required*/],//the path to the phrase's audio file
      })
    } else {
      this._myForm = this._formBuilder.group({
        "text": ['', [Validators.required,
        Validators.pattern(hebrewRegx),//the text must be hebrew text
        Validators.minLength(1)]],//the text must be more the one char
        "categoryID": ['', Validators.required],//the associated category
        "imagePath": ['', /*Validators.required*/],//the path to the pharse's image
        "audioFile": ['', /*Validators.required*/],//the path to the phrase's audio file
      })
      this._myForm.patchValue({ 'categoryID': this.navParams.get('categoryName') });//add the input category to the form object
    }
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
    if (!this._myForm.valid) { return; }
    this._viewCtrl.dismiss(this._myForm.value);//return the new object
    this._myForm.reset();//reset the form
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
            const pic = this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            this.storageProvider.uploadFile(pic);
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
    this.micText = STOP_REC;
    this.recording = true;
    this.timer.startTimer();
    let data = this._audioRecordProvider.startRecord();

    if (data instanceof Error) {
      this.recording = false;
      this.micText = START_REC;
      this.showAlert("לא הצלחנו לבצע הקלטה....", data.message);
    } else {
      this.fileName = data;
    }
  }

  //stop the record and save the audio file on local variable
  stopRecord() {
    if (this.recording) {
      this.micText = START_REC;
      let data = this._audioRecordProvider.stopRecord();

      this.duration = this.timer.getTime();
      
      // this.timer.destroy();

      if (data instanceof Error) {
        this.recording = false;
        this.showAlert(data.message, "");
      } else {
        if (data == true) {
          this.recording = false;
          this._myForm.patchValue({ 'audioFile': this.fileName });//insert the capture audio file to the form 
        } else {
          this.recording = false;
          this.showAlert("Error", "");
        }
      }
    }
  }

  /** calculate the record file's duration
   * @param duration object with the seconds, minutes and hours that was record
   * @returns the duration in millisconds format
   */
  private calcDuration(duration):number{
    return ( (+duration.seconds) + (+duration.minutes * 60) ) * 1000;//the first '+' is to tall the JS that this is numbers
  }

  // play the input file on the device speakers
  playAudio() {
    this.playing = !this.playing;

    let data = this._audioRecordProvider.playAudio(this.fileName, this.firstTime);
    this.firstTime = false;

    let durationInt = this.calcDuration(this.duration);
    //if the record file duration is bigger then 0
    if (durationInt > 0) {
      //after the file ended switch the buttons
      let durationInteravle = setInterval(() => {
        this.playing = !this.playing;
        clearInterval(durationInteravle);//after using the interavl reset it
      }, durationInt);
    }


    if (data instanceof Error)
      this.showAlert("לא הצלחנו להשמיע את ההקלטה....", data.message);
  }

  //stop the file in the current posision
  stopAudio() {
    this.playing = !this.playing;
    let data = this._audioRecordProvider.stopAudio(this.fileName);
    if (data instanceof Error) {
      this.showAlert("לא הצלחנו לעצור את ההקלטה....", data.message);
      return;
    }
  }

  //TODO:
  //use the http provider to get the audio file from the TTS server
  getAudioFromTTS() {
    if (this._myForm.controls['text'].value == "" || !this.isHebrew(this._myForm.controls['text'].value)) {
      this.showAlert("לא הוכנס משפט", null);
    } else {
      /*tts_promise is the promise that make sure that we using the real recieved data from the TTS server
        and not the promise object that the "get" HTTP request returns until the real data arive from the server.*/
      let tts_promise = new Promise((resolve, reject) => {
        resolve(this.httpProvider.textToSpeech(this._myForm.controls['text'].value, Enums.VOICE_OPTIONS.SIVAN)); // Yay! Everything went well!
      });

      //let "data" be the real data recieved from the TTS server- the audio file.
      tts_promise.then((data) => {
        /*TODO: "data" is the recieved audio file from the TTS server
          after waiting to the tts_promise to be solved.
        */
        console.log("in add phrase page:\n" + data);
        this._myForm.patchValue({ 'audioFile': data });//insert the capture audio file to the form 

      });
    }
  }

  /**check if a given text is in hebrew chars
   * @param str - input text to check
   * @returns - true if the input string is hebrew
   *            false if not
   */
  private isHebrew(str): boolean {
    let re = new RegExp(hebrewRegx);
    if (re.test(str)) {
      return true
    } else {
      return false;
    }
  }


  /********** Deprecaed ********************/

  /*askForIneternetPermissions() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET)
      .then((result) => {
        if (result.hasPermission)
          console.log('Has permission?', result.hasPermission);
        else {
          console.log("in else");
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
        }
      }).catch((err) => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
      });
  }

  private saveFileToStorage() {
    let savePath;
    let name = this._audioRecordProvider.generateFileName();
    console.log("tts file name is = " + name);
    if (this.platform.is('ios')) {
      savePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + name;
    } else if (this.platform.is('android')) {
      savePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + name;
    }
    this.audio = this.media.create(savePath);
    console.log("save path is = " + savePath);
  }*/



}