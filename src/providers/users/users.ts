import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseProvider } from '../firebase/firebase';
import { User } from '@firebase/auth-types';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  users = [];
  
  constructor(public firebaseProvider: FirebaseProvider) {
        
    this.updateUsersArray()
  }

  //updating the users local array by subscribe the users observable array.
  private updateUsersArray() {
    this.firebaseProvider.importCategories();
    this.firebaseProvider.getUsersObservable.subscribe(a => {
      this.users = a;
    });
  }

   /**
   * for handling the promise returned, use "promise.then((data) =>{'data' hold the wanted user...})"
   * for catching error use "promise.then().catch(e){...handling error...}"
   * @param email of user.
   * @returns Promise object
   */
  public getUserByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      resolve(this.users.find(e => e.email === email));
    })
  }

}
