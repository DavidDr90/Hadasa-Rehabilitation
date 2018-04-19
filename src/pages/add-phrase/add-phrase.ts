import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';


//look in this link for more info abuot images
//https://blog.ionicframework.com/ionic-native-accessing-ios-photos-and-android-gallery-part-i/

@IonicPage()
@Component({
  selector: 'page-add-phrase',
  templateUrl: 'add-phrase.html',
})
export class AddPhrasePage {

  private _myForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _camera: Camera) {
    this._myForm = this._formBuilder.group({
      //this should be an object like the phrase object
      "text": ['', Validators.required],//the phrase
      "categoryID": ['', Validators.required],//the associated category
      "imagePath": ['', Validators.required],//the path to the pharse's image
      "audioFile": ['', Validators.required],//the path to the phrase's audio file
    })
  }

  ionViewDidLoad() {
    
  }

  onSubmit(){
    console.log(this._myForm.value);
    // use the form object to create new phares object and add it to the server
  }

  //check all the next functions
  getPicture() {
    if (Camera['installed']()) {//if there is a camera install in this device
      this._camera.getPicture({
        destinationType: this._camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this._myForm.patchValue({ 'imagePath': 'data:image/jpg;base64,' + data });//insert the capture image path to the form 
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {//if there is NOT camera on this device go to the file maneger to look for an image
      // this.fileInput.nativeElement.click();
    }
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

  

}
