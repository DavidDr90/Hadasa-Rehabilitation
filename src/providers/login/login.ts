
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor() {
    console.log('Hello LoginProvider Provider');
  }

  //Logic to know if a user is logged in or not, 
  //change this to true after login
  loginStatus: boolean = false;


}
