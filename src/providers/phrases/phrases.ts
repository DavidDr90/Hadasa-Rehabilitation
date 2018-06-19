import { Injectable } from '@angular/core';
import { Phrase } from '../../models/Phrase';
import { FirebaseProvider } from '../firebase/firebase';
import { Category } from '../../models/Category';
import { ErrorProvider } from '../error/error';
import { FavoriteProvider } from '../favorite/favorite';
import { HomePage } from '../../pages/home/home';



/**
 * phrases provider behaves like categories provider, 
 * local phrases array is created, stored, modified and updated here, 
 * based on parent category
 */
@Injectable()
export class PhrasesProvider {

  public phrases: Phrase[];
  public parentCategory: Category;
  //categoryName: any;
  public hasPhrases: boolean = false;

  constructor(public firebaseProvider: FirebaseProvider, public error: ErrorProvider) {
  }


/**
 * same like updateCategoriesArray, just for phrases
 */
  public AsyncPhrasesloader(parentCategory: Category): Promise<Phrase[]> {
    console.log("AsyncPhrasesloader start");
    this.parentCategory = parentCategory;
    let promise = this.getPhrases(this.parentCategory);
    promise.then((data) => {
      this.phrases = data;
      if(this.phrases != undefined && this.phrases.length > 0)
          this.hasPhrases = true;
      else
          this.hasPhrases = false;
    })
    return promise;     
  }


  /**
  * first,calling import of all category's phrases.
  * then, create a Promise object that active only when arrayOfPhrases filled up once.
  * Promise return to an async function that handle with him.
  * subscribe listen to the db while the app is alive.
  * note that there is no relation between Promise object to  method. 
  * @param category the parent category to get phrases from
  */
  public getPhrases(category: Category): Promise<Phrase[]> {
    this.firebaseProvider.importPhrases(category);
    return new Promise((resolve, reject) => {
      this.firebaseProvider.getPhrasesObservable.subscribe(arrayOfPhrases => {
        this.phrases = arrayOfPhrases;
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
  public getPhraseByName(n: string): Promise<Phrase> {
    return new Promise((resolve, reject) => {
      try {
        let temp = this.phrases.find(phrs => phrs.name == n);
        resolve(temp)
      }
      catch (e) {
        console.log(e)
        this.error.simpleTosat("The wanted category doesn't exist")
      }
    })
  }

  /**
   * Rearrange the current phrases array by order propery.
   * usually used after adding or removing of phrase. 
   */
  public arrangePhrasesByOrder(){
    for(var i = 0; i<this.phrases.length; i++){
      this.setOrder(this.phrases[i],i);
    }
  }

  /**
   * for handling the promise returned, use "promise.then((data) =>{'data' hold the wanted phrase...})"
   * for catching error use "promise.then().catch(e){...handling error...}"
   * @param n name of phrase
   * @returns Promise object
   */
  public getPhraseById(id: string): Promise<Phrase> {
    return new Promise((resolve, reject) => {
      try {
        let temp = this.phrases.find(phrs => phrs.id === id)
        resolve(temp)
      }
      catch (e) {
        console.log(e)
        this.error.simpleTosat("The wanted category doesn't exist")
      }
    })
  }

  /**
   * add phrase, update DB and arrange by order.
   * if addPhrase called from App-Builder don't arrange by order.
   */
  public addPhrase(phrase: Phrase, callFromAppBuilder = false) {
    this.firebaseProvider.addPhrase(phrase);
    if(callFromAppBuilder == false)
    this.AsyncPhrasesloader(this.parentCategory).then(res => {
      this.arrangePhrasesByOrder();
    })
  }

  /**
   * remove phrase from db and update favorites
   * @param phrase phrase to remove
   */
  public async removePhrase(phrase: Phrase) {
    console.log("phrase provider remove");
    this.firebaseProvider.removePhrase(phrase);
    console.log("phrase provider after remove");
    let favoriteProvider = new FavoriteProvider(HomePage.favClass);
    favoriteProvider.remove_fav_phrases(phrase);
    favoriteProvider.remove_from_commom_phrases(phrase);
    this.AsyncPhrasesloader(this.parentCategory).then(() => {
      this.arrangePhrasesByOrder();
    })
    
  }

  //SETTERS
  public setName(phrase: Phrase, newName: string) {
    phrase.name = newName;
    this.firebaseProvider.updatePhrase(phrase)
  }
  public setImageUrl(phrase: Phrase, newURL: string) {
    phrase.imageURL = newURL;
    this.firebaseProvider.updatePhrase(phrase)
  }
  public setAudioUrl(phrase: Phrase, newURL: string) {
    phrase.audio = newURL;
    this.firebaseProvider.updatePhrase(phrase)
  }
  public setCategoryID(phrase: Phrase, newCategoryParent: string) {
    phrase.categoryID = newCategoryParent;
    this.firebaseProvider.updatePhrase(phrase)
  }
  public setIsFav(phrase: Phrase, isFav: boolean) {
    phrase.isFav = isFav;
    this.firebaseProvider.updatePhrase(phrase);
  }
  //each time a category has chosen, her views increase by 1.
  public increaseViews(phrase: Phrase) {
    phrase.views++;
    this.firebaseProvider.updatePhrase(phrase)
  }
  public setOrder(phrase: Phrase, order: number) {
    phrase.order = order;
    console.log("phrase provider set order update fire");
    this.firebaseProvider.updatePhrase(phrase);
  }
  public updatePhrase(phrase: Phrase) {
    this.firebaseProvider.updatePhrase(phrase)
  }
  public changeVisibility(phrase: Phrase) {
    phrase.visibility = !phrase.visibility;
    this.firebaseProvider.updatePhrase(phrase);
  }

}

