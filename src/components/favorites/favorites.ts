import { Component } from '@angular/core';
import { Favorite } from '../../models/Favorite';
import { HomePage } from '../../pages/home/home';


@Component({
  selector: 'favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesComponent {
	favorite: Favorite;

	constructor() {
		this.favorite=HomePage.favClass;
	}

}