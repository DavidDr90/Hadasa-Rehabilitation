import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

declare var cordova: any;

@Injectable()
export class GetImageProvider {

  constructor(private camera: Camera,
    public platform: Platform,
    private file: File,
    private filePath: FilePath
  ) {

  }

  /********* The following are the image handler functions ************/

  /**define the native camera oprtion from the givven input
   * then call the getPicture() method with the option
   * @param sourceType - from where to get the image, the camera or the gallery
   * @returns name to the new picture
   * dispaly an error window on fialure
   */
  public takePicture(sourceType) : string {
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
            return this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        return this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      throw err;
    });
    return "";
  }

  // Create a new name for the image from the current time
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) : string{
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      return newFileName;
    }, error => {
      throw error;
    });
    return "";
  }

  /** add the path to the form filed 
   * @param img - the path to the image 
   * @returns the path to the image to display on the screen
   */
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

}
