import { Injectable } from '@angular/core';
import { Phrase } from '../../models/Phrase'
import { Category } from '../../models/Category'
import { User } from '../../models/user'
import { PhrasesProvider } from '../phrases/phrases'
import { CategoryServiceProvider } from '../category-service/category-service'

/**
 * this provider create the defult categorys and phrases when the app is first load
 */


@Injectable()
export class AppBuilderProvider {

  constructor(public categoryProvider:CategoryServiceProvider, public phraseProvider:PhrasesProvider) {
  }

   //===================================
  /**this method create and add new phrase to the user DB.
   * @param name, the name of the phrase
   * @param imageURL, the imageURL of the phrase's image
   * @param categoryID, the ID of the category which the phrase belong to
   * @param audio, the URL of the audio file of the phrase.
   */
  createDefPhrase(name:string, imageURL:string, categoryID:string, audio:string){
    let phr=new Phrase("", name, imageURL, categoryID, 0, "", false);
   this.phraseProvider.addPhrase(phr);
   setTimeout(()=>{
    let x = this.phraseProvider.getPhraseByName(name)
    console.log( x)
    console.log( x.id)
    return x.id;
  }, 500)
  }

   //===================================
  /**this method create and add new category to the user DB.
   * @param name, the name of the category
   * @param imageURL, the imageURL of the category's image
   * @param parentCategoryID, the ID of the category which the category belong to
   */
   createDefCat(name:string, imageURL:string, parentCategoryID:string){
    let cat=new Category(name, "", imageURL, "ofek1b@gmail.com", parentCategoryID, 0, false);
    this.categoryProvider.addCategory(cat);
    let temp= new Promise((resolve, reject)=>{
      resolve(this.categoryProvider.getCategoriesByName(name))
    });
    temp.then((data)=>{
      console.log("the answer is... are... is... are:   "+data)
      let returnedValue=data
      return returnedValue;
    }) 
   }

}
