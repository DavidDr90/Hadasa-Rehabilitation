import { Component, Input } from '@angular/core';
import { Category } from '../../models/Category';



@Component({
  selector: 'my-category',
  templateUrl: 'my-category.html'
})
export class MyCategoryComponent {

  @Input() category: Category;

  constructor() {
    if (this.displayStar())
      document.getElementById("star").addEventListener("click", this.onClick);
  }

  onClick() {
    console.log("click! change favorite star!");
    //TODO: fix the next line
    // this.category.setIsFav = !this.category.getIsFav();
    this.displayStar;
  }

  displayStar(): boolean {
    if (this.category == undefined) {
      console.log("category is undefine!");
      return false;
    }
    if (this.category.getIsFav)
      document.getElementById("star").innerHTML = "<img src=\"https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/special%20pages%20logo%2Fyellow_star.png?alt=media&token=595f4e48-5bc5-4660-9960-71bcd5d7a658\"/>";
    else
      document.getElementById("star").innerHTML = "<img src=\"https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/special%20pages%20logo%2Fwhite_star.png?alt=media&token=430dd26a-f2e9-43dc-95d4-7b5572f63985\"/>";
    return true;
  }






}
