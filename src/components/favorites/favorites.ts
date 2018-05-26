import { Component, Input } from '@angular/core';
import { Category } from '../../models/Category';
import { Phrase } from '../../models/Phrase';
import { Favorite } from '../../models/Favorite';


@Component({
  selector: 'favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesComponent {
	@Input() favorite: Favorite;

	constructor() {
	
	}

}