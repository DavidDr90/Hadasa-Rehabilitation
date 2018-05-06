import { Component, Input/*, Output*/ } from '@angular/core';
import { Category } from '../../models/Category';
//import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Client } from '../../models/Client';


/**
 * Generated class for the MyCategoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-category',
  templateUrl: 'my-category.html'
})
export class MyCategoryComponent {

  @Input() category: Category;
  @Input() client: Client;
  
  constructor() {

  }
  

}
