
import { Injectable } from '@angular/core';
import { Category } from '../../models/Category';
import { Client } from '../../models/Client';

/*
  Generated class for the CategoryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryServiceProvider {

  private categories;
   
  constructor() {
    this.categories = [];
  }

  //suppose to import all client's categories from DB
  public importCategories(client: Client){
    var title = "Numbers";
    var url = "/assets/imgs/numbers.jpg";
    this.addCategory(new Category(title,url));
  }

  public getCategories(): Array<Category>{
    return this.categories;
  }

  public getCategory(index: number): Category{
    return this.categories[index];
  }

  public addCategory(value: Category): void {
      this.categories.push(value);
  }

  removeCategory(category: Category){
      this.categories.splice(this.categories.indexOf(category),1);
  }

}
