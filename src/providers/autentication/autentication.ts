import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User } from '@firebase/auth-types';




@Injectable()
export class AutenticationProvider {

  user : User;
  loggedIn: boolean;
  constructor(public afAuth: AngularFireAuth) {
  
  }


  public async createAuthentication() {
    this.loggedIn = false;
    let user = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>
  {
    this.user = this.afAuth.auth.currentUser;
    this.loggedIn = true;
  }).catch(()=>
  {
    this.loggedIn = false;
  })

  }

get GetDisplayName()
{
  if(this.user != null)
  {
    return this.user.displayName;
  }
}

}
