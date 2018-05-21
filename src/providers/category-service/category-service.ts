
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

  private updateCategoriesArray(){
    this.firebaseProvider.importCategories();
    this.firebaseProvider.getCategoriesObservable.subscribe(a => {
      this.categories = a;
    });
  }

  public get getCategories() {
    return this.categories;
  }

  public getCategoriesByName(n: string){
    return this.categories.find(cat => cat.name == n)
  }
  public getCategoryById(id: string): Category{
    return this.categories.find(cat => cat.id === id);
  }

  public addCategory(category: Category): void {
      this.firebaseProvider.addCategory(category);
      this.updateCategoriesArray();
  }

  removeCategory(category: Category){
    this.firebaseProvider.removeCategory(category);
    this.updateCategoriesArray();
  }

}
