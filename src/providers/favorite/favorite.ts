import { Injectable } from '@angular/core';
import { Favorite } from '../../models/Favorite'
import { Phrase } from '../../models/Phrase'
import { Category } from '../../models/Category'
import * as Enums from '../../consts/enums';
import { ErrorProvider } from '../error/error';

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
      if(this.fav.common_cat[i].views<this.fav.common_cat[this.fav.min_cat_index].views)
        this.fav.min_cat_index=i;
  }
          
//===================================	
/**update the less viewed phrase index on the list of the most viewed phrases (common_phrases).
 * */		
  private update_min_phrase(){
    var i;
    for(i=0; i<this.fav.common_phrases.length; i++)
      if(this.fav.common_phrases[i].views<this.fav.common_phrases[this.fav.min_phrases_index].views)
        this.fav.min_phrases_index=i;
  }
          
//===================================	
/**check if a recently viewed category should be in the common categories list.
  * @param cat, the recently viewed category
  * */      
  addCommonFavCat(cat: Category){
    this.update_min_cat();
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
    //if the recently viewed category viewed more times then the minimum viewed
    // category on the common categories list, add the recently viewed category
    // instead of the minimum viewed category on the common categories list
    // and update the minimun viewed category in the comoon_categories list.
    else if(cat.views>this.fav.common_cat[this.fav.min_cat_index].views){
      this.fav.common_cat[this.fav.min_cat_index]=cat
      this.update_min_cat();
    }
    //if the recently viewed category isn't common category, do nothing
    else{
      return;
    }
  }
          
//===================================
/**check if a recently viewed phrase should be in the common phrases list.
  * @param phrase, the recently viewed phrase
  * */
  addCommonFavPhrases(phrase: Phrase){
    this.update_min_phrase();
    for(let i=0; i<this.fav.common_phrases.length; i++){
      if (this.fav.common_phrases[i].id===phrase.id){
        this.fav.common_phrases[i]=phrase;
        this.update_min_phrase();
        return;
      }
    }
    //if the common phrases list not filled, add the phrase to the list
    if(this.fav.common_phrases.length<Enums.NUM_FAVORITES_PHRASES){
      this.fav.common_phrases[this.fav.common_phrases.length]=phrase;
      this.update_min_phrase();
    }
    /*if the recently viewed phrase viewed more times then the minimum viewed
      phrase on the common phrases list, add the recently viewed phrase
      instead of the minimum viewed phrase on the common phrases list
      and update the minimun viewed phrase in the common phrases list.*/
    else if(phrase.views>this.fav.common_phrases[this.fav.min_phrases_index].views){
      this.fav.common_phrases[this.fav.min_phrases_index]=phrase
      this.update_min_phrase();
    }
     //if the recently viewed category isn't common category, do nothing
    else
      return;
  }

  /**remove category from common category list.
   * example for usage: when delete category from DB, we need to check that this category not exist in the common categories list.
  * @param cat, the category to be removed from the common categories list
  * */
 remove_from_commom_cat(cat:Category){
  let i;
  //find the index of category in the categories common list
  for(i=0; i<this.fav.common_cat.length; i++)
    if(cat.id===this.fav.common_cat[i].id)
      break;
  //if the category exist in the list, delete it.
  if(i<this.fav.common_cat.length)
    this.fav.common_cat.splice(i);
  }
  

/**remove phrase from common phrase list.
   * example for usage: when delete phrase from DB, we need to check that this phrase not exist in the common phrases list.
  * @param phrase, the phrase to be removed from the common categories list
  * */
 remove_from_commom_phrases(phrase:Phrase){
  let i;
  //find the index of phrase in the phrases common list
  for(i=0; i<this.fav.common_phrases.length; i++)
    if(phrase.id===this.fav.common_phrases[i].id)
      break;
  //if the phrase exist in the list, delete it.
  if(i<this.fav.common_phrases.length)
    this.fav.common_phrases.splice(i);
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
  * @returns 0 in case of success, -1 in case of failure
  * */
  add_fav_cat(cat){
    // check if there is a free place for the category on the favorites categories list
    if(this.fav.chosen_fav_cat.length==Enums.NUM_FAVORITES_CAT){
      //no place, error message to the user
      return -1;
    }
      
    else{
      this.fav.chosen_fav_cat[this.fav.chosen_fav_cat.length]=cat;//there is a place, category added successfuly.
      cat.isFav=true;
    }
    return 0;
  }
          
//===================================
/**add new phrase to favorites.
  * @param phrase, the phrase that the user wants to add to the favorite phrases list
  * @returns 0 in case of success, -1 if the list is full.
  * */
  add_fav_phrase(phrase){
    //check if there is a free place for the phrase on the favorites phrases list
    if(this.fav.chosen_fav_phrases.length==Enums.NUM_FAVORITES_PHRASES){
      //no place, error message to the user
      return -1;

    }
    else{
      this.fav.chosen_fav_phrases[this.fav.chosen_fav_phrases.length]=phrase;//there is a place, phrase added successfuly.
      phrase.isFav=(true);
    }
    return 0;
}
          
//===================================
/**remove category from favorites.
  * @param cat, the category that the user wants to remove from the favorite categories list
  * */
  remove_fav_cat(cat){
    let i;
    //find the index of cat in the categories favorite list
    for(i=0; i<this.fav.chosen_fav_cat.length; i++)
      if(cat.id===this.fav.chosen_fav_cat[i].id)
        break;
    //check if cat not exist in the categories favorite list
    if(i>=this.fav.chosen_fav_cat.length)
      return;
    else{
      cat.isFav=false;
      this.fav.chosen_fav_cat.splice(i, 1);//remove the category from the list
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
      if(phrase.id===this.fav.chosen_fav_phrases[i].id)
        break;
    //check if phrase not exist in the phrases favorite list
    if(i>=this.fav.chosen_fav_phrases.length)
      return;
    else{
      phrase.isFav=(false);
     this.fav.chosen_fav_phrases.splice(i, 1);
    }
  }      
          
}