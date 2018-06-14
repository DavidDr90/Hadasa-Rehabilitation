import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-our-app',
  templateUrl: 'our-app.html',
})
export class OurAppPage {

  constructor(private view: ViewController, public navParams: NavParams) {
  }

  closePage(){
    this.view.dismiss();
  }

}
