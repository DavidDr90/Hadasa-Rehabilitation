
import { Injectable } from '@angular/core';
import { Phrase } from '../../models/Phrase';
import { FirebaseProvider } from '../firebase/firebase';
import { Category } from '../../models/Category';


@Injectable()
export class PhrasesProvider {

  phrases: any;
  categoryName: any;

  constructor(public firebaseProvider: FirebaseProvider) {
  }

  //first,calling import of all category's phrases.
  //then, create a Promise object that active only when arrayOfPhrases filled up once.
  //Promise return to an async function that handle with him.
  //subscribe listen to the db while the app is alive.
  //note that there is no relation between Promise object to subscribe method. 
  public getPhrases(category: Category) {
    this.firebaseProvider.importPhrases(category);
    return new Promise((resolve, reject) => {
      this.firebaseProvider.getPhrasesObservable.subscribe(arrayOfPhrases => {
        resolve(arrayOfPhrases);
      })
    })
  }

   /**
   * for handling the promise returned, use "promise.then((data) =>{'data' hold the wanted phrase...})"
   * for catching error use "promise.then().catch(e){...handling error...}"
   * @param n name of phrase
   * @returns Promise object
   */
  public getPhraseByName(n: string): Promise<Phrase>{
    return new Promise((resolve, reject) => {
        resolve(this.phrases.find(phrs => phrs.name == n));
    })
  }
  
  /**
   * for handling the promise returned, use "promise.then((data) =>{'data' hold the wanted phrase...})"
   * for catching error use "promise.then().catch(e){...handling error...}"
   * @param n name of phrase
   * @returns Promise object
   */
  public getPhraseById(id: string): Promise<Phrase>{
    return new Promise((resolve, reject) => {
        resolve(this.phrases.find(phrs => phrs.id === id));
    })
  }
  
  public addPhrase(phrase: Phrase) {
    //if there is no image provide with the phrase add a defult image
    if((phrase.imageURL == "") || (phrase.imageURL == null) || (phrase.imageURL == undefined))
      phrase.imageURL = "/assets/imgs/logo.png";//using the app logo for defult image
    console.log("before addPhrase is Phrase.ts"); 
    this.firebaseProvider.addPhrase(phrase);
  }

  removePhrase(phrase: Phrase) {
    this.firebaseProvider.removePhrase(phrase);
  }



}
