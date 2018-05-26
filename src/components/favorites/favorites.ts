import { Component, Input } from '@angular/core';
import {Favorite} from '../../models/Favorite';
import {Category} from '../../models/Category';
import {Phrase} from '../../models/Phrase';


@Component({
  selector: 'favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesComponent {
	@Input() favorite: Favorite;

	constructor() {
	
	}

}