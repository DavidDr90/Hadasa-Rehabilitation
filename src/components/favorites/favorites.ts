import { Component } from '@angular/core';
import { Favorite } from '../../models/Favorite';
import { HomePage } from '../../pages/home/home';
import { Category } from '../../models/Category';
import { PhrasesPage } from '../../pages/phrases/phrases';
import { NavController, Platform } from 'ionic-angular';


@Component({
	selector: 'favorites',
	templateUrl: 'favorites.html'
})
export class FavoritesComponent {
	favorite: Favorite;

	private isIOS: boolean = false;

	constructor(public navCtrl: NavController, public platform: Platform) {
		this.favorite = HomePage.favClass;
		//if this is iOS disable the sticky in the html
		if (platform.is('ios'))
			this.isIOS = true;
		else
			this.isIOS = false;
	}
	//popup the category's phrases's page.
	public openCategoryPhrases(category: Category) {
		this.navCtrl.push(PhrasesPage, { parentCategory: category });
	}


}