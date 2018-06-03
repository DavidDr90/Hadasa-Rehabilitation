
import { Injectable } from '@angular/core';
import { Category } from '../../models/Category';
import { FirebaseProvider } from '../firebase/firebase';
import { ErrorProvider } from '../error/error';
import { UnsubscriptionError } from 'rxjs';
import { AutenticationProvider } from '../autentication/autentication';

/*
  Generated class for the CategoryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryServiceProvider {

  private categories = [];
  
  //categories that have parent category, and shown only at there parentCategory's page (next the phrases)
  private subCategories = []

  //import categories collection from db and initialize categories attr.
  constructor(public firebaseProvider: FirebaseProvider, public error: ErrorProvider,  public authentication: AutenticationProvider,) {
    if(authentication.afAuth.auth.currentUser)
      this.updateCategoriesArray();
  }

   
  /**
   * updating the categories local arraies and refreshing the page, the method return a Promise object"
   * for catching error use "promise.then().catch(e){...handling error...}"
   * @returns Promise object
   */
  public updateCategoriesArray(): Promise<Category[]> {
    this.firebaseProvider.importCategories();
    return new Promise((resolve, reject) => {
    this.firebaseProvider.getCategoriesObservable.subscribe(a => {
        this.categories = a.filter(cat => cat.parentCategoryID == "");
        resolve(this.subCategories = a.filter(cat => cat.parentCategoryID != ""))
      })
    })
  }
  
  /**
   * get sub-category of specific category by its name, the method return a Promise object.
   * for catching error use "promise.then().catch(e){...handling error...}"
   * @param parentCategory parent category id of the wanted sub-category
   * @param name name of the wanted sub-category
   * @returns Promise object
   */
  public getSubCategoryByName(parentCategoryID: string, name:string): Promise<Category>{
    return new Promise((resolve, reject) => {
      try{
        let temp = this.subCategories.filter(cat => cat.parentCategoryID == parentCategoryID)
        let temp1 = temp.find(cat => cat.name == name);
        if(temp1 == undefined)
          throw("The wanted category doesn't exist")
        resolve(temp1)
      }
      catch(e){
        console.log(e)
        this.error.simpleTosat(e)
      }
      })
  }

  public get getCategories() {
    return this.categories;
  }

  //   /**
  //  * for handling the promise returned, use "promise.then((data) =>{'data' hold the wanted category...})"
  //  * for catching error use "promise.then().catch(e){...handling error...}"
  //  * @param n name of category
  //  * @returns Promise object
  //  */
  // public getSubCategoryByName(n: string): Promise<Category>{
  //   return new Promise((resolve, reject) => {
  //     try{
  //       let temp = this.subCategories.find(cat => cat.name == n)
  //       resolve(temp);
  //     }
  //     catch(e){
  //       console.log(e)
  //       this.error.simpleTosat("The wanted sub-category doesn't exist")
  //     }

  //   })
  // }

  //   /**
  //  * for handling the promise returned, use "promise.then((data) =>{'data' hold the wanted category...})"
  //  * for catching error use "promise.then().catch(e){...handling error...}"
  //  * @param n name of category
  //  * @returns Promise object
  //  */
  // public getSubCategoryById(id: string): Promise<Category> {
  //   return new Promise((resolve, reject) => {
  //     try{
  //       let temp = this.subCategories.find(cat => cat.id === id);
  //       resolve(temp);
  //     }
  //     catch(e){
  //       console.log(e)
  //       this.error.simpleTosat("The wanted sub-category doesn't exist")
  //     }
  //   })
  // }

  /**
   * for handling the promise returned, use "promise.then((data) =>{'data' hold the wanted category...})"
   * for catching error use "promise.then().catch(e){...handling error...}"
   * @param n name of category
   * @returns Promise object
   */
  public getCategoryByName(n: string): Promise<Category>{
    return new Promise((resolve, reject) => {
    try{
        let temp = this.categories.find(cat => cat.name == n);
        if(temp == undefined)
           reject("category undefined");
        else
           resolve(temp);
    }
    catch(e){
      console.log(e)
      this.error.simpleTosat("The wanted category doesn't exist")
    }
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
      try{
        let temp = this.categories.find(cat => cat.id === id)
        resolve(temp)
      }
      catch(e){
        console.log(e)
        this.error.simpleTosat("The wanted category doesn't exist")
      }
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


  //SETTERS
  public setName(category:Category, newName: string) {
    category.name = newName;
    this.firebaseProvider.updateCategory(category)
    this.updateCategoriesArray();
  }
  public setUrl(category:Category, newURL: string) {
    category.imageURL = newURL;
    this.firebaseProvider.updateCategory(category)
    this.updateCategoriesArray();
  }
  public setParentCategoryID(category:Category, newCategoryParent: string) {
    category.parentCategoryID = newCategoryParent;
    this.firebaseProvider.updateCategory(category)
    this.updateCategoriesArray();
  }
  public setIsFav(category:Category, isFav: boolean) {
    category.isFav = isFav;
    this.firebaseProvider.updateCategory(category)
    this.updateCategoriesArray();
  }
  //each time a category has chosen, her views increase by 1.
  public increaseViews(category:Category) {
    category.views++;
    this.firebaseProvider.updateCategory(category)
    this.updateCategoriesArray();
  }

}
