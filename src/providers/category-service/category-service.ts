
import { Injectable } from '@angular/core';
import { Category } from '../../models/Category';
import { FirebaseProvider } from '../firebase/firebase';

/*
  Generated class for the CategoryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryServiceProvider {

  private categories = [];

  //import categories collection from db and initialize categories attr.
  constructor(public firebaseProvider: FirebaseProvider) {
    this.updateCategoriesArray();
  }

  private updateCategoriesArray() {
    this.firebaseProvider.importCategories();
    this.firebaseProvider.getCategoriesObservable.subscribe(a => {
      this.categories = a;
    });
  }

  public get getCategories() {
    return this.categories;
  }

  /**
   * for handling the promise returned, use "promise.then((data) =>{'data' hold the wanted category...})"
   * for catching error use "promise.then().catch(e){...handling error...}"
   * @param n name of category
   * @returns Promise object
   */
  public getCategoriesByName(n: string): Promise<Category>{
    return new Promise((resolve, reject) => {
        resolve(this.categories.find(cat => cat.name == n));
    })
  }
  
    /**
   * for handling the promise returned, use "promise.then((data) =>{'data' hold the wanted category...})"
   * for catching error use "promise.then().catch(e){...handling error...}"
   * @param n id of category, id that given by firebase
   * @returns Promise object
   */
  public getCategoryById(id: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      resolve(this.categories.find(cat => cat.id === id));
    })
  }

  public addCategory(category: Category) {
    //if there is no image provide with the phrase add a defult image
    // if ((category.imageURL == "") || (category.imageURL == null) || (category.imageURL == undefined))
    //   category.imageURL = "/assets/imgs/logo.png";//using the app logo for defult image
    this.firebaseProvider.addCategory(category);
    this.updateCategoriesArray();
  }

  removeCategory(category: Category) {
    this.firebaseProvider.removeCategory(category);
    this.updateCategoriesArray();
  }

}
