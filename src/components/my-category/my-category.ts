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
      //this.displayStar(cat);
      this.favProvider=new FavoriteProvider(HomePage.favClass);  
  }

  
  /**on clock function when the user click on the star of category to add/remove it from the favorite.*/
  onClickStar(cat:Category) {
    console.log("click! change favorite star!");
    
    //update the favorite categories list
    if(cat.getIsFav()===true)
      this.favProvider.remove_fav_cat(cat)
    else
    this.favProvider.add_fav_cat(cat)
    
    //update the display
    cat.setIsFav(!cat.getIsFav());
    this.displayStar(cat);
  }

  /**update the display of the star of the category to be yellow if it is a favorite category. else, white star.*/
  displayStar(cat:Category) {
   // 1.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
    /*if (this.cat.getIsFav())
      document.getElementById("star").innerHTML = "<img src=\"https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/special%20pages%20logo%2Fyellow_star.png?alt=media&token=595f4e48-5bc5-4660-9960-71bcd5d7a658\"/>";
    else
      document.getElementById("star").innerHTML = "<img src=\"https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/special%20pages%20logo%2Fwhite_star.png?alt=media&token=430dd26a-f2e9-43dc-95d4-7b5572f63985\"/>";
  */
    }






}
