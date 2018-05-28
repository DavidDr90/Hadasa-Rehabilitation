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

  public tempCategory;

  constructor(public categoryProvider:CategoryServiceProvider, public phraseProvider:PhrasesProvider, public user:User) {
  }

   //===================================
  /**this method create and add new phrase to the user DB.
   * @param name, the name of the phrase
   * @param imageURL, the imageURL of the phrase's image
   * @param categoryID, the ID of the category which the phrase belong to
   * @param audio, the URL of the audio file of the phrase.
   */
  // createDefPhrase(name:string, imageURL:string, categoryID:string, audio:string){
  //  this.phraseProvider.AddNewPhrase("", name, imageURL, categoryID, 0, audio, false);
  // }

   //===================================
  /**this method create and add new category to the user DB.
   * @param name, the name of the category
   * @param imageURL, the imageURL of the category's image
   * @param parentCategoryID, the ID of the category which the category belong to
   */


  //  //getCategoryByName return promise object, so need an promise obj handle 
  // async createDefCat(name:string, imageURL:string, parentCategoryID:string){
  //   let cat=new Category(name, "", imageURL, this.user.getEmail, parentCategoryID, 0, false);
  //   this.categoryProvider.addCategory(cat);

  //   let promise = await this.categoryProvider.getCategoryByName("Holy Moly");
  //   let temp = new Promise((resolve, reject) => {
  //     resolve(promise);
  //   });
  //   temp.then((data) => {
  //     this.tempCategory = data;
  //     this.tempCategory as Category
  //     console.log(this.tempCategory.id)
  //   })

  //  }

}
