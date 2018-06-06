import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, ActionSheetController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import * as Enums from '../../consts/enums';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Base64 } from '@ionic-native/base64';
import { NativeAudio } from '@ionic-native/native-audio';

//for the recorder functions
import { Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { StorageProvider } from '../../providers/storage/storage';
import { AudioRecordProvider } from '../../providers/audio-record/audio-record';
import { Category } from '../../models/Category';
import { Phrase } from '../../models/Phrase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ErrorProvider } from '../../providers/error/error';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';


/** This page is a form to create Phrase or Category objects
 * Phrase will have the following fileds:
 *    text
 *    imagePath
 *    audioFile
 *    categoryID
 * Category will have the following fields:
 *    text
 *    imagePath
 *    categoryIC (is this is a perant category this field will be 'null')
 * @param navParams.get('fromWhere') the form recive from the previuse page a variable state the object to be created
 * @returns on dissmis the form return a new object depent on the caller to the form.
 */

declare var cordova: any;
declare var window: any;

const START_REC = "התחל הקלטה";
const STOP_REC = "עצור הקלטה";
const hebrewRegx = "[\u0590-\u05fe 0-9/\//ig.?!,/\\\\/ig@#$%^&*()]+$";//regex for hebrew chars

@IonicPage()
@Component({
  selector: 'page-add-phrase',
  templateUrl: 'add-phrase.html',
})
export class AddPhrasePage {
  @ViewChild('myTimer') timer;
  @Input() backgroundColor;

  private pleaseWaitLoadingWindow: any;
  private isCategory: boolean = true;

  private duration: any;
  private _myForm: FormGroup;
  private _curserPosition;
  private _nikudArray = Enums.NIKUD;

  lastImage: string = null;
  imageURL: string = null;
  micText = START_REC;
  audioFileURL;

  //for the radio button sections
  sentenceOrNoun;
  categoryColor;

  parentCategoryID;

  percentage; // Should be implement on uploading
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
    public alertCtrl: AlertController,
    private camera: Camera,
    private _audioRecordProvider: AudioRecordProvider,
    /* media provider for the record methods */
    public platform: Platform,
    private file: File,
    private filePath: FilePath,
    private storageProvider: StorageProvider,
    public navParams: NavParams,
    public aAuth: AngularFireAuth,
    public errorProvider: ErrorProvider,
    public categoryProvaider: CategoryServiceProvider,
    public loadingCtrl: LoadingController,
    public media: Media,
    public base64: Base64,
    public nativeAudio: NativeAudio,
  ) {

    this.getColorsFromList();

    //create a loading window
    this.pleaseWaitLoadingWindow = this.loadingCtrl.create({
      content: 'אנא המתן...',
      dismissOnPageChange: true//close the loading window when close the page
    });


    //if we gote here from some categroy page and we want to add new phrase
    if (this.navParams.get('fromWhere') == Enums.ADD_OPTIONS.PHRASE) {
      this.isCategory = false;
    }

    //create the form object depend from where you arrived
    this._myForm = this._formBuilder.group({
      "text": ['', [Validators.required, Validators.minLength(1)]],//the text must be more the one char
      "categoryID": ['', /*Validators.required*/],//the associated category
      "imagePath": ['', /*Validators.required*/],//the path to the pharse's image
      "audioFile": ['', /*Validators.required*/],//the path to the phrase's audio file
    });

    this.parentCategoryID = this.navParams.get('categoryID');//get the state from the previuse page
    if (this.parentCategoryID != Enums.ADD_OPTIONS.NO_CATEGORY)
      this._myForm.patchValue({ 'categoryID': this.parentCategoryID });//add the input category to the form object for sub-categorys
  }

  private n: number = 0;
  /** check the value of sentece or nuon from the radio button list
   * patch the right value to the category ID
   * if this is a sentence the function retrive the sub category of the input category
   * if this is a noun patch the input category ID.
   * @default categoryID if the user choose 'sentence' the phrase will automaticly be in the 'sentece' sub category
   */
  private checkSentenceOrNoun(n) {
    //to evoid endless recursion
    if (n == 10) {
      this.errorProvider.simpleTosat("לא הצלחנו ליצור את קטגורית 'משפטים'");
      return;
    }
    if (this.sentenceOrNoun == "sentence") {
      let subCategory;
      let promise = this.categoryProvaider.getSubCategoryByName(this.parentCategoryID, Enums.SENTENCES);//search for the 'משפטים' sub category
      promise.then((data) => {
        subCategory = data.id;
        if (subCategory) {
          this._myForm.patchValue({ 'categoryID': subCategory });//add the input category to the form object for sub-categorys
          this.pleaseWaitLoadingWindow.dismiss();//close the loading window
        }
      }).catch(() => {
        this.pleaseWaitLoadingWindow.present();//presnet the loading window
        //create new 'משפטים' sub category
        let newSentencesCategory = new Category(
          Enums.SENTENCES, "", "" /*TODO: add defualt image to 'משפטים' sub category*/,
          this.aAuth.auth.currentUser.email, this.parentCategoryID, 0, false, Enums.DEFUALT_CATEGORY_COLOR, 1, true);

        this.categoryProvaider.addCategory(newSentencesCategory);//add the new 'משפטים' sub category to the parent category

        setTimeout(() => {
          this.checkSentenceOrNoun(n++);//reactived this function, now the data should have the new sentences category
        }, 1000);
      });

    } else if (this.sentenceOrNoun == "noun") {
      this._myForm.patchValue({ 'categoryID': this.parentCategoryID });//add the input category to the form object for sub-categorys
    }
  }

  /** @returns the nikud array
   */
  public get getNikud() {
    return this._nikudArray;
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

  // The user cancelled, so we dismiss without sending data back
  cancel() {
    this._viewCtrl.dismiss();
  }

  /**When press the 'אישור' button send the new form object to the phrase class
   * and then save the new phrase on the serve
   */
  onSubmit() {
    // use the form object to create new phares object and add it to the server
    if (!this._myForm.valid) { return; }

    let returnObject;//can be Category or Phrase
    if (this.isCategory) {
      //get the input color that the user choose, if the user didn't choose it set to defualt
      if (this.categoryColor === undefined)
        this.categoryColor = Enums.DEFUALT_CATEGORY_COLOR;
      else {
        this.categoryColor = this.categoryColor.replace(/\s/g, "");//remove white spacess
        this.categoryColor = Enums.COLOR_LIST.find((item) => item.hexNumber == this.categoryColor);//look for the right object in the colors array
        this.categoryColor = (this.categoryColor == undefined) ? Enums.DEFUALT_CATEGORY_COLOR : this.categoryColor;
      }
      returnObject = new Category(this._myForm.controls['text'].value, "",
        this._myForm.controls['imagePath'].value, this.aAuth.auth.currentUser.email,
        this._myForm.controls['categoryID'].value, 0, false, this.categoryColor, 1, true);
    } else {
      returnObject = new Phrase("", this._myForm.controls['text'].value,
        this._myForm.controls['imagePath'].value, this._myForm.controls['categoryID'].value,
        0, this._myForm.controls['audioFile'].value, false, 1, true);
    }
    this._myForm.reset();//reset the form
    this._viewCtrl.dismiss(returnObject);//return the new object
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
          text: '\xa0 מצלמה',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '\xa0 גלריה',
          icon: 'images',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '\xa0 חיפוש ברשת',
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
  async takePicture(sourceType) {
    try {
      // Create options for the Camera Dialog
      var options = {
        quality: 100,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.DATA_URL,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      let user = this.aAuth.auth.currentUser.email;
      const imageFolder = "/images/";
      const result = await this.camera.getPicture(options);//get the path to the image

      const image = 'data:image/jpeg;base64,' + result;

      let path = user + imageFolder + this.createFileName();//create the path on the storage

      const pictures = firebase.storage().ref(path);
      pictures.putString(image, "data_url").then(url => {
        //TODO: connect the progress bar
        this.imageURL = url.downloadURL;
        console.log(this.imageURL);
        this._myForm.patchValue({ 'imagePath': this.imageURL });//insert the capture image path to the form 
      })
    } catch (err) {
      this.errorProvider.alert("לא הצלחנו לבחור תמונה....", err);
    }
  }

  // Create a new name for the image from the current time
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  /********* The following are the voice record handler functions ************/
  /*  all the record function should be tested on an android or iOS emulator or device */

  /**
  * @returns file name from the current time and data
  */
  private generateFileName() {
    return 'record' +
      new Date().getDate() +
      new Date().getMonth() +
      new Date().getFullYear() +
      new Date().getHours() +
      new Date().getMinutes() +
      new Date().getSeconds() +
      '.mp3';
  }

  //start the record
  startRecord() {
    this.micText = STOP_REC;
    this.recording = true;

    try {
      this.fileName = this.generateFileName();
      if (this.platform.is('ios')) {
        this.audioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.audioFilePath);
      } else if (this.platform.is('android')) {
        this.audioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.audioFilePath);
      }
      this.audio.startRecord();
    }
    catch (error) {
      console.log(error);
    }

    /*
    this.timer.startTimer();
    let data = this._audioRecordProvider.startRecord();

    if (data instanceof Error) {
      this.recording = false;
      this.micText = START_REC;
      this.errorProvider.alert("לא הצלחנו לבצע הקלטה....", data.message);
    } else {
      this.fileName = data;
    }*/
  }

  //stop the record and save the audio file on local variable
  stopRecord() {
    try {
      if (this.recording) {
        this.micText = START_REC;
        this.recording = !this.recording;
        let user = this.aAuth.auth.currentUser.email;
        const audioFolder = "/audio/";

        this.audio.stopRecord();

        // save the new audio file to the storage
        // encode the media object file to base64 file
        this.base64.encodeFile(this.audioFilePath).then((base64File: string) => {
          // fix the encoding
          const newBase = base64File.slice(base64File.indexOf(',') + 1, base64File.length);

          const audioData = 'data:audio/mp3;base64,' + newBase;

          let path = user + audioFolder + this.fileName;//create the path on the storage

          const audios = firebase.storage().ref(path).putString(audioData, "data_url")
            .then(url => {
              //TODO: connect the progress bar
              this.audioFileURL = url.downloadURL;
              console.log(this.audioFileURL);
              this._myForm.patchValue({ 'audioFile': url.downloadURL });//insert the capture image path to the form 
            });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  /** calculate the record file's duration
   * @param duration object with the seconds, minutes and hours that was record
   * @returns the duration in millisconds format
   */
  private calcDuration(duration): number {
    return ((+duration.seconds) + (+duration.minutes * 60)) * 1000;//the first '+' is to tall the JS that this is numbers
  }

  // play the input file on the device speakers
  playAudio() {
    this.playing = !this.playing;

    /* DONT work for now
    this.nativeAudio.preloadComplex(this.fileName, this.audioFileURL, 1, 1, 0).
      then(onSuccess =>
        console.log("playing"),
        onError => console.log(onError));
        */
  }

  //stop the file in the current posision
  stopAudio() {
    this.playing = !this.playing;

  }

  //use the http provider to get the audio file from the TTS server
  getAudioFromTTS() {
    this.errorProvider.toastWithButton("האופציה הזאת לא עובדת בגרסה הנוכחית", "");
    return;

    // // Deprecaed for this versoin
    // if (this._myForm.controls['text'].value == "" || (this._myForm.controls['text'].value == undefined)) {
    //   this.showAlert("לא הוכנס משפט", null);
    // } else {
    //    /* let tts_promise = new Promise((resolve, reject) => {
    //     resolve(this.httpProvider.textToSpeech(this._myForm.controls['text'].value, Enums.VOICE_OPTIONS.SIVAN)); // Yay! Everything went well!
    //   });*/


    //    /*tts_promise is the promise that make sure that we using the real recieved data from the TTS server
    //     and not the promise object that the "get" HTTP request returns until the real data arive from the server.*/
    //   let tts_promise=this.httpProvider.textToSpeech(this._myForm.controls['text'].value, Enums.VOICE_OPTIONS.SIVAN);
    //  //let "data" be the real data recieved from the TTS server- the audio file.
    //   tts_promise.then((data) => {
    //     /*TODO: "data" is the recieved audio file from the TTS server
    //       after waiting to the tts_promise to be solved.
    //     */
    //     console.log("in add phrase page:\n" + data);
    //     this._myForm.patchValue({ 'audioFile': data });//insert the capture audio file to the form 
    //   })

    // }
  }


  /********** Colors Select Function ********************/
  /** This functions create a select with colors 
   *  please notic that this section is releted to the scss file
   *  any change in this section will cause a change in the scss file
   *  and in the variable.scss file
   */


  // string array for the colors in the select
  private colors: Array<string>;
  // base color of the select
  private color: string;

  /** get all the colors from the const array in Enums.ts
   *  the local colors array will hold the hex numbers string
   */
  private getColorsFromList() {
    this.colors = new Array<string>();
    Enums.COLOR_LIST.forEach((item) => {
      this.colors.push(item.hexNumber);
    });
    this.color = this.colors[0];
  }

  /** create the select element with the color from the colors array
   * each line in the select element is with another color
   */
  private prepareColorSelector() {
    setTimeout(() => {
      let buttonElements = document.querySelectorAll('div.alert-radio-group button');
      if (!buttonElements.length) {
        this.prepareColorSelector();
      } else {
        for (let index = 0; index < buttonElements.length; index++) {
          let buttonElement = buttonElements[index];
          let optionLabelElement = buttonElement.querySelector('.alert-radio-label');
          let color = optionLabelElement.innerHTML.trim();

          if (this.isHexColor(color)) {
            buttonElement.classList.add('colorselect', 'color_' + color.slice(1, 7));
            if (color == this.color) {
              buttonElement.classList.add('colorselected');
            }
          }
        }
      }
    }, 100);
  }

  /** this function check if an input string is a hex number
   * @param color a string to check
   * @returns true if the string is hex number
   */
  private isHexColor(color) {
    let hexColorRegEx = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return hexColorRegEx.test(color);
  }

  /** change the check mark to the selected color
   * @param color the clicked color
   */
  private selectColor(color) {
    let buttonElements = document.querySelectorAll('div.alert-radio-group button.colorselect');
    for (let index = 0; index < buttonElements.length; index++) {
      let buttonElement = buttonElements[index];
      buttonElement.classList.remove('colorselected');
      if (buttonElement.classList.contains('color_' + color.slice(1, 7))) {
        buttonElement.classList.add('colorselected');
      }
    }
  }

  /** set the choosen color to the category background color
   * @param color the choosen color 
   */
  private setColor(color) {
    this.categoryColor = color;
  }
}