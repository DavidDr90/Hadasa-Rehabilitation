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
  

  constructor(public afAuth: AngularFireAuth) {
  
  }


  public async createAuthentication() {
    let user = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.user = this.afAuth.auth.currentUser;
  }

get GetDisplayName()
{
  if(this.user != null)
  {
    return this.user.displayName;
  }
}

}
