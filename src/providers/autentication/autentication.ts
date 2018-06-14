import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '@firebase/auth-types';



@Injectable()
export class AutenticationProvider {

  user : User;
  loggedIn: boolean

  public SHOULD_VERIFY_MESSAGE = "אנא אמת את המייל שהזנת על ידי כניסה לקישור שנשלח למייל "
  public ERROR_SENDING_VERIFY_MESSAGE = "התרחשה שגיאה בשליחת מייל אימות, אנא נסה שנית"
  public EMAIL_OR_PASSWORD_WRONG_MESSAGE = "כתובת המייל ו/או הסיסמה שגויים"
  public EMAIL_NOT_VALID_MESSAGE = "כתובת המייל שהוזנה אינה תקפה"
  public PASSWORD_NOT_VALID_MESSAGE = "על הסיסמה להכיל לפחות 6 תווים"
  public EMAIL_DOESNT_EXISTS_MESSAGE = "כתובת המייל שהוזנה איננה קיימת במערכת"
  public RESET_PASSWORD_SUCCESS_MESSAGE = "מייל לאיפוס סיסמה נשלח בהצלחה לכתובת שהוזנה"
  public EMAIL_ALREADY_EXISTS_MESSAGE = "כתובת המייל שהוזנה כבר קיימת במערכת"

  constructor(public afAuth: AngularFireAuth) {}
//This page written by Or Cohen
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* This function connects firebase authentication
*  with the email and password arguments and connects the user.
*/
async signIn(email, password): Promise<any>
{
    return new Promise(
      async (resolve,reject) =>
      {
        await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
          async success =>
          {  
            await this.getCurrentUser.reload()
            this.getCurrentUser.getToken(true)
            resolve(success)
          },
          failed =>
          {
            reject(failed)
          }
        ).catch(
          err =>
          {
            reject(err)
          }
        )
      })
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* This function registering a new user
*  with the email and password arguments and connects the user.
*/
async registerNewUser(email, password) : Promise<any>
{
  return new Promise(
    async (resolve,reject) =>
    {
      
      await await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
        success =>
        {
          resolve(success)
        },
        failed =>
        {
          reject(failed)
        }
      ).catch(
        err =>
        {
          reject(err)
        }
      )
    })    
  }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // This function called when the user click logOut and disconnects the user.
  async logOut()
  {
    firebase.auth().signOut();
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* this function called on init-app and checks the state of the user.
  *  if the user is connected and verified email then it sets the user variable.
  */
  
  public initApp() 
  {
    firebase.auth().onAuthStateChanged((user) => {
      // User is signed in.
      if (user && user.emailVerified) {
        this.user = this.afAuth.auth.currentUser;
      }
    });
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* This function returns if the user is logged-in or not.*/

  public isLoggedIn() {
    if(this.getCurrentUser)
      return true
    return false;
  }


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* This function sends a reset-password mail to the email input.*/

  public resetPassword(email: string){
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)

  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* This function returns the displayName of the user.*/

  public get getUserName(){
    return this.afAuth.auth.currentUser.displayName;
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* This function returns the Email of the user.*/

  public get getUserEmail(){
    return this.afAuth.auth.currentUser.email;
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* This function returns the user object.*/

  public get getCurrentUser(){
    return this.afAuth.auth.currentUser;
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* This function returns if this user (email) is verified.*/
  public isVerified()
  {
    return(firebase.auth().currentUser.emailVerified)
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* This function checks if the email is valid and returns true or false.*/

  public checkEmailValidity(email)
  {
    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
    var re = new RegExp(emailPattern);
    return (re.test(email)) 
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* This function checks if the password is valid (atleast 6 digits) and returns true or false.*/

  public checkPasswordValidity(password)
  {
    if (password && password.length >= 6)
      return true
    return false;
  }

}
