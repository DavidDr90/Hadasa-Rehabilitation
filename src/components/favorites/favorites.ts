import { Component } from '@angular/core';
import { NUM_FAVORITES } from '../../consts/enums';

/**
 * Generated class for the FavoritesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesComponent {
  /*chosen_fav_cat[]; //array of the favorite categories chosen by the user
	chosen_fav_phrases[]; //array of the favorite phrases chosen by the user
	common_cat[]; //array of the common categories that the user use.
	common_phrases[]; //array of the common phrases that the user use.*/
	min_cat_index; //the index of the category with the less views
	min_phrases_index; //the index of the category with the less views
  

  constructor() {
    this.min_cat_index=Number.MAX_SAFE_INTEGER;
    this.min_phrases_index=Number.MAX_SAFE_INTEGER;
  }

}




/*


	

class favorites(){
	
	
	//update the less viewed category on the list of the most viewed categories.
	update_min_cat(){
		for(i=0 to common_cat.size)
			if(common_cat[i].views<min_cat_index.views)
				min_cat_index=common_cat[i];
	}
	
	//update the less viewed phrase on the list of the most viewed phrases.
	update_min_phrases(){
		for(i=0 to common_phrases.size)
			if(common_phrases[i].views<min_phrases_index.views)
				min_phrases_index=common_phrases[i];
	}
	
	//check if a recently viewed category should be in the common categories list.
	addCommonFavCat(category){
		if(common_cat.size<MAX_FAV_CAT){
			common_cat[common_cat.size]=category;
			update_min_cat();
		}	
		else if(category==common_cat[min_cat_index].views)
			update_min_cat();
		else if(category.views>common_cat[min_cat_index].views){
			common_cat[min_cat_index]=category.views
			update_min_cat();
		}
		else
			return;
	}
	
	//check if a recently viewed phrase should be in the common phrases list.
	addCommonFavPhrases(phrase){
		if(common_phrases.size<MAX_FAV_PHRASES){
			common_phrases[common_phrases.size]=phrase;
			update_min_phrases();
		}	
		else if(phrase==common_phrases[min_phrases_index].views)
			update_min_phrases();
		else if(phrase.views>common_phrases[min_phrases_index].views){
			common_phrases[min_phrases_index]=phrase.views
			update_min_phrases();
		}
		else
			return;
	}
	
	//add new category to favorites
	add_fav_cat(category){
		if(chosen_fav_cat.size>MAX_FAV_CAT)
			alert("you cant choose more then "+MAX_FAV_CAT+"favorite categories");
		else
			chosen_fav_cat[chosen_fav_cat.size]=category;
	}
	
	//remove category from favorites
	remove_fav_cat(category){
		for(i=0; i<chosen_fav_cat.size; i++)
			if(category==chosen_fav_cat[i])
				break;
		if(i>=chosen_fav_cat.size)
			oconsole.log("ERROR-cannot remove from favorite list\ncategory not exist in the favorite list");
		else
			chosen_fav_cat.splice(i);
	}
	
		//add new phrase to favorites
	add_fav_phrase(phrase){
		if(chosen_fav_phrases.size>MAX_FAV_PHRASES)
			alert("you cant choose more then "+MAX_FAV_PHRASES+"favorite phrases");
		else
			chosen_fav_phrases[chosen_fav_phrases.size]=phrase;
	}
	
	//remove phrase from favorites
	remove_fav_phrases(phrase){
		for(i=0; i<chosen_fav_phrases.size; i++)
			if(phrase==chosen_fav_phrases[i])
				break;
		if(i>=chosen_fav_phrases.size)
			oconsole.log("ERROR-cannot remove from favorite list\nphrase not exist in the favorite list");
		else
			chosen_fav_phrases.splice(i);
	}
	
			
			
	
	
			
		



*/