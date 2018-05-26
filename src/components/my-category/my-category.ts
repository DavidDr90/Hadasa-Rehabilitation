import { Component, Input } from '@angular/core';
import { Category } from '../../models/Category';
import { HomePage } from '../../pages/home/home'
import { FavoriteProvider } from '../../providers/favorite/favorite'



@Component({
  selector: 'my-category',
  templateUrl: 'my-category.html'
})
export class MyCategoryComponent {

  @Input() category: Category;
  favProvider:FavoriteProvider

  constructor() {
      this.favProvider=new FavoriteProvider(HomePage.favClass);  
  }


}
