import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User } from '@firebase/auth-types';
import { MyApp } from '../../app/app.component';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { HomePage } from '../../pages/home/home';

@Injectable()
export class AutenticationProvider {

  user : User;
  loggedIn: boolean
  
  constructor(public afAuth: AngularFireAuth) {
  }

  
    //This function returns a promise (will wait until gets the logged-in user information) and returns it.
    public createAuthentication() {
      return new Promise((resolve,reject) => 
    {
      //The line below will open google's pop-up window.
      let user = this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>
      {
        this.user = this.afAuth.auth.currentUser;
        resolve(this.afAuth.auth.currentUser)
      }
      )})
  }

  public isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        resolve(user.displayName);
      })
    })
  }

  public loggedInStatus(){
    return this.loggedIn;  
  }

}
