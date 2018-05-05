import { Component/*, Input, Output*/ } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPhrasePage } from '../add-phrase/add-phrase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  addPhrasePage = AddPhrasePage;

  
  constructor(public navCtrl: NavController) {

  }

  user_name = "אורח";

  // Should get the user name from the login process
  get userName(){
    // TODO:
    // get the user name from the Google account.
    return this.user_name;
  }

}
