import { Injectable } from '@angular/core';
import { Favorite } from '../../models/Favorite'
import { Phrase } from '../../models/Phrase'
import { Category } from '../../models/Category'
import * as Enums from '../../consts/enums';

@Injectable()
export class FavoriteProvider {
   private fav:Favorite;

  constructor(favorite:Favorite) {
    this.fav=favorite;
  }
          
//========================================================================================
          
                        /* ===================================
                        *HANDALING THE COMMON LIST METHODS
                        *the common list are the list of the most
                        *viewed categories & phrases by the user
                        *===================================*/
          
//===================================
/**update the less viewed category index on the list of the most viewed categories (common_cat).
 * */	
  private update_min_cat(){
    var i;
    for(i=0; i<this.fav.common_cat.length; i++)
      if(this.fav.common_cat[i].getViews<this.fav.common_cat[this.fav.min_cat_index].getViews)
        this.fav.min_cat_index=i;
  }
          
//===================================	
/**update the less viewed phrase index on the list of the most viewed phrases (common_phrases).
 * */		
  private update_min_phrase(){
    var i;
    for(i=0; i<this.fav.common_phrases.length; i++)
      if(this.fav.common_phrases[i].getViews<this.fav.common_phrases[this.fav.min_phrases_index].getViews)
        this.fav.min_phrases_index=i;
  }
          
//===================================	
/**check if a recently viewed category should be in the common categories list.
  * @param cat, the recently viewed category
  * */      
  addCommonFavCat(cat: Category){
    console.log( cat)
    for(let i=0; i<this.fav.common_cat.length; i++){
      if (this.fav.common_cat[i].id===cat.id){
        this.fav.common_cat[i]=cat;
        this.update_min_cat();
        return;
      }
    }
    //if the common categories list not filled, add the category to the list
    if(this.fav.common_cat.length<Enums.NUM_FAVORITES_CAT){
      this.fav.common_cat[this.fav.common_cat.length]=cat;
        this.update_min_cat();
    }
    //if the recently viewed category is the minimum viewes category on the common
    //category list, update the minimum viewes category on that list.	
    else if(cat==this.fav.common_cat[this.fav.min_cat_index])
      this.update_min_cat();
    //if the recently viewed category viewed more times then the minimum viewed
    // category on the common categories list, add the recently viewed category
    // instead of the minimum viewed category on the common categories list
    // and update the minimun viewed category in the comoon_categories list.
    else if(cat.getViews>this.fav.common_cat[this.fav.min_cat_index].getViews){
      this.fav.common_cat[this.fav.min_cat_index]=cat
      this.update_min_cat();
    }
    //if the recently viewed category isn't common category, do nothing
    else
      return;
    console.log( this.fav.common_cat)
  }
          
//===================================
/**check if a recently viewed phrase should be in the common phrases list.
  * @param phrase, the recently viewed phrase
  * */
  addCommonFavPhrases(phrase: Phrase){
    //if the common phrases list not filled, add the phrase to the list
    if(this.fav.common_phrases.length<Enums.NUM_FAVORITES_PHRASES){
      this.fav.common_phrases[this.fav.common_phrases.length]=phrase;
      this.update_min_phrase();
    }
    /*if the recently viewed phrase is the minimum viewes phrase on the common
      phrases list, update the minimum viewes phrase on that list.*/	
    else if(phrase==this.fav.common_phrases[this.fav.min_phrases_index])
      this.update_min_phrase();
    /*if the recently viewed phrase viewed more times then the minimum viewed
      phrase on the common phrases list, add the recently viewed phrase
      instead of the minimum viewed phrase on the common phrases list
      and update the minimun viewed phrase in the common phrases list.*/
    else if(phrase.getViews>this.fav.common_phrases[this.fav.min_phrases_index].getViews){
      this.fav.common_phrases[this.fav.min_phrases_index]=phrase
      this.update_min_phrase();
    }
     //if the recently viewed category isn't common category, do nothing
    else
      return;
  }
          
//========================================================================================
          
                        /* ===================================
                          *HANDALING THE FAVORITE LIST METHODS
                          *the favorite list are the list of the 
                          *favorite categories & phrases that
                          *has been chosen by the user
                        *===================================*/
              
//===================================
/**add new category to favorites.
  * @param cat, the category that the user wants to add to the favorite categories list
  * */
  add_fav_cat(cat){
    // check if there is a free place for the category on the favorites categories list
    if(this.fav.chosen_fav_cat.length==Enums.NUM_FAVORITES_CAT)
      alert("you cant choose more then "+Enums.NUM_FAVORITES_CAT+"favorite categories");//no place, error message to the user
    else{
      this.fav.chosen_fav_cat[this.fav.chosen_fav_cat.length]=cat;//there is a place, category added successfuly.
      cat.setIsFav(true);
    }
  }
          
//===================================
/**add new phrase to favorites.
  * @param phrase, the phrase that the user wants to add to the favorite phrases list
  * */
  add_fav_phrase(phrase){
    //check if there is a free place for the phrase on the favorites phrases list
    if(this.fav.chosen_fav_phrases.length==Enums.NUM_FAVORITES_PHRASES)
      alert("you cant choose more then "+Enums.NUM_FAVORITES_PHRASES+"favorite phrases");//no place, error message to the user
    else{
      this.fav.chosen_fav_phrases[this.fav.chosen_fav_phrases.length]=phrase;//there is a place, phrase added successfuly.
      phrase.setIsFav(true);
    }
}
          
//===================================
/**remove category from favorites.
  * @param cat, the category that the user wants to remove from the favorite categories list
  * */
  remove_fav_cat(cat){
    let i;
    //find the index of cat in the categories favorite list
    for(i=0; i<this.fav.chosen_fav_cat.length; i++)
      if(cat==this.fav.chosen_fav_cat[i])
        break;
    //check if cat not exist in the categories favorite list
    if(i>=this.fav.chosen_fav_cat.length)
      console.log("ERROR-cannot remove from favorite list\ncategory not exist in the favorite list");
    else{
      cat.setIsFav(false);
      this.fav.chosen_fav_cat.splice(i);//remove the category from the list
    }              
  }
          
//===================================
/**remove phrase from favorites.
  * @param phrase, the phrase that the user wants to remove from the favorite phrases list
  * */
  remove_fav_phrases(phrase){
    let i;
    //find the index of phrase in the categories favorite list
    for(i=0; i<this.fav.chosen_fav_phrases.length; i++)
      if(phrase==this.fav.chosen_fav_phrases[i])
        break;
    //check if phrase not exist in the phrases favorite list
    if(i>=this.fav.chosen_fav_phrases.length)
      console.log("ERROR-cannot remove from favorite list\nphrase not exist in the favorite list");
    else{
      phrase.setIsFav(false);
      this.fav.chosen_fav_phrases.splice(i);
    }
  }
          
          
          
}



