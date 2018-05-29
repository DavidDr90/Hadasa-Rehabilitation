import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../models/user';


@Injectable()
export class AutenticationProvider {

  user : User;
  loggedIn: boolean
  
  constructor(public afAuth: AngularFireAuth) {
  }

  /*This method called when user press login/logout button.
   * If the user not connected already it redirects him to the google-auth. (log-in).
   * If the user connected already this function will disconnect him (log-out).
  */
  toggleSignIn(user) 
  {
    return new Promise((resolve,reject) => 
    {
      if (!firebase.auth().currentUser) 
      {
        console.log("Authentication not found !");
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(()=>
        {
          resolve(true);
        })
      }
      else 
      {
        console.log("Authentication found ]!");
        firebase.auth().signOut();
        resolve(false);
      }
    })
}

async signIn(user: User)
{
  try{
    const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password).then(   
    ok => {
      console.log("email/pass sign in success", ok);
  },
  error => {
      console.log("email/pass sign in error", error);
  })

  }
  catch(e){
    console.log(e);
  }
}

async registerNewUser(user: User)
{
  try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(   
   ok => {
      console.log("email/pass sign in success", ok);
  },
  error => {
      console.log("email/pass sign in error", error);
  });
  }
  catch(e){
    console.log(e);
  }
}

async logOut()
{
  firebase.auth().signOut();
}


  //OLD VERSION - KEEP IT ON COMMENT (ASK OR BEFORE DELETE IT).

    //This function returns a promise (will wait until gets the logged-in user information) and returns it.
  //   public createAuthentication() {
  //     return new Promise((resolve,reject) => 
  //   {
  //     //The line below will open google's pop-up window.
  //     //you can NOT use auth.signInWithPopup() in mobile phones, should use auth.signInWithRedirect() 
  //     let user = this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(()=>
  //     {
  //       this.user = this.afAuth.auth.currentUser;
  //       console.log("user = " + user);
  //       resolve(this.afAuth.auth.currentUser)
  //     }
  //     )})
  // }


  /* This function called on initiate the application.
   * If the user already logged in from last use then it will keep him logged in.
  */
  public initApp() 
  {
    // Result from Redirect authentication.
    firebase.auth().getRedirectResult().then((result) => {
      if (result.credential) 
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.currentUser;
    }).catch((error) => {
      // Handle Errors.
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential')
      {
        alert('You have already signed up with a different auth provider for that email.');
      } 
      else 
      {
        console.error(error);
      }
    });
    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged((user) => {
      // User is signed in.
      if (user) {
        this.user = this.afAuth.auth.currentUser;
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
      }
    });
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

  public get getUserName(){
    return this.afAuth.auth.currentUser.displayName;
  }

  public get getUserEmail(){
    return this.afAuth.auth.currentUser.email;
  }

}
