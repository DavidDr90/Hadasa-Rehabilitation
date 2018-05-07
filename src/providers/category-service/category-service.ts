
import { Injectable } from '@angular/core';
import { Category } from '../../models/Category';
import { Client } from '../../models/Client';
import { FirebaseProvider } from '../firebase/firebase';

/*
  Generated class for the CategoryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryServiceProvider {

  private categories = [];
  firebaseProvider;

  constructor(firebaseProvider: FirebaseProvider) {
    this.firebaseProvider = firebaseProvider;
    firebaseProvider.importCategories();
  }

  public getCategories() {
    return this.categories;
  }

  public getCategory(index: number): Category{
    return this.categories[index];
  }

  public addCategory(category: Category): void {
      this.firebaseProvider.addCategory(category);
  }

  removeCategory(category: Category){
      this.categories.splice(this.categories.indexOf(category),1);
  }

}
