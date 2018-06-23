import { Component, Input } from '@angular/core';
import { Category } from '../../models/Category';
import { HomePage } from '../../pages/home/home'
import { FavoriteProvider } from '../../providers/favorite/favorite'
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { ErrorProvider } from '../../providers/error/error';
import * as Enums from '../../consts/enums';



@Component({
  selector: 'my-category',
  templateUrl: 'my-category.html'
})
export class MyCategoryComponent {

  @Input() category: Category;
  @Input() editMode: boolean;
  favProvider:FavoriteProvider

  constructor(public categoryProvider:CategoryServiceProvider, public error:ErrorProvider) {
      this.favProvider=new FavoriteProvider(HomePage.favClass); 
  }
  
  /** this function works when the user try to add/remove category to favoriets.
   * update the "isFav" field in the DB of the category
   * ignore in edit mode
   */
  public updateIsFav(event){
    // category updateisfav ignored in edit mode
    if(this.editMode){
      return;
    }
    event.stopPropagation();
    this.category as Category;
    if(this.category.isFav==false){
      let flag=this.favProvider.add_fav_cat(this.category) //add favorite category
      //not able to add the category to favoriets.
      if(flag==-1){
        this.error.simpleToast(("you cant choose more then "+Enums.NUM_FAVORITES_CAT+"favorite categories"))
        return;
      }
        
      this.category.isFav=true;
    }
    else{
      this.favProvider.remove_fav_cat(this.category) //add favorite category
      this.category.isFav=false;
    }
    this.categoryProvider.setIsFav(this.category, this.category.isFav);//update DB
  }

  /**on click method when the user click on a category
   * the method check if to add the category to the common categories list.
   * @param cat the category that clicked
   * ignore in edit mode
  */
 public catOnClick(event){
  // category catonclik ignored in edit mode
  if(this.editMode){
    this.error.simpleToast("לא ניתן להיכנס לקטגוריה במצב עריכה");
    return;
  }
  this.categoryProvider.increaseViews(this.category)// update the category views field in the DB
  this.favProvider.addCommonFavCat(this.category); //check if the category is common category
}


}
