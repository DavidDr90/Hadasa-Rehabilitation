
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

  constructor(public firebaseProvider: FirebaseProvider) {
    firebaseProvider.importCategories();
    let x = firebaseProvider.getCategoriesObservable.subscribe(a => {
      this.categories = a;
    });
  }

  get getCategories() {
    return this.categories;
  }

  public getCategoryById(id: string): Category{
    return this.categories.find(cat => cat.id === id);
  }

  public addCategory(category: Category): void {
      this.firebaseProvider.addCategory(category);
  }

  //needs to connect with db
  removeCategory(category: Category){
      this.categories.splice(this.categories.indexOf(category),1);
  }

}
