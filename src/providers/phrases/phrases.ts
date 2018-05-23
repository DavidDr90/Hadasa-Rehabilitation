
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



  public AddNewPhrase(name: string, imageURL: string, id: string, categoryID: string, views: number, audio: string, isFav:boolean)
  {
    var phrase = new Phrase(id, name,imageURL, categoryID, views, audio, isFav);
    this.phrases.push(phrase);
  }
  
  public addPhrase(phrase: Phrase) {
    this.firebaseProvider.addPhrase(phrase);
}

removePhrase(phrase: Phrase){
  this.firebaseProvider.removePhrase(phrase);
}


public getPhraseByName(n: string){
  return this.phrases.find(phr => phr.name == n)
}

public getPhraseById(id: string): Category{
  return this.phrases.find(phr => phr.id === id);
}





}
