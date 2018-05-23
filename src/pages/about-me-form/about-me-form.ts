import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * the user will see this page if he haven't fill his about my section
 */

@IonicPage()
@Component({
  selector: 'page-about-me-form',
  templateUrl: 'about-me-form.html',
})
export class AboutMeFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  // this.aboutMeCategory = this.categoryProvider.getCategoriesByName('aboutMe');


}
