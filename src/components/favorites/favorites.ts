import { Component } from '@angular/core';
import { Favorite } from '../../models/Favorite';
import { HomePage } from '../../pages/home/home';
import { Category } from '../../models/Category';
import { PhrasesPage } from '../../pages/phrases/phrases';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesComponent {
	favorite: Favorite;

	constructor(public navCtrl:NavController) {
		this.favorite=HomePage.favClass;
	}
	 //popup the category's phrases's page.
	 public openCategoryPhrases(category: Category) {
    this.navCtrl.push(PhrasesPage, {parentCategory: category});
  }


}