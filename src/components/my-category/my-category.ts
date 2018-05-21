import { Component, Input/*, Output*/ } from '@angular/core';
import { Category } from '../../models/Category';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';


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
  
  constructor() {
    this.displayStar();
    document.getElementById("star").addEventListener("click", this.onClick);
  }

  onClick(){
    this.category.setIsFav=!this.category.getIsFav;
    this.displayStar;
  }

  displayStar(){
    if(this.category.getIsFav==true)
      document.getElementById("star").innerHTML="<img src=\"https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/special%20pages%20logo%2Fyellow_star.png?alt=media&token=595f4e48-5bc5-4660-9960-71bcd5d7a658\"/>";
    else
      document.getElementById("star").innerHTML="<img src=\"https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/special%20pages%20logo%2Fwhite_star.png?alt=media&token=430dd26a-f2e9-43dc-95d4-7b5572f63985\"/>";
  }



  


}
