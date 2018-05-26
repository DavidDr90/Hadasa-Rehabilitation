import { Component } from '@angular/core';
import {Category} from '../models/Category';
import {Phrase} from '../models/Phrase';



export class Favorite {
	  
	public chosen_fav_cat: Category[]; //array of the favorite categories chosen by the user
	public chosen_fav_phrases: Phrase[]; //array of the favorite phrases chosen by the user
	public common_cat: Category[]; //array of the common categories that the user use.
	public common_phrases: Phrase[]; //array of the common phrases that the user use.
	public min_cat_index; //the index of the category with the less views
	public min_phrases_index; //the index of the category with the less views
  

	constructor() {
		this.min_cat_index=0;
		this.min_phrases_index=0;
		this.chosen_fav_cat=[];
		this.chosen_fav_phrases=[];
		this.common_cat=[];
		this.common_phrases=[];
	}

	//========================================================================================

							/* ===================================
											GETTERS
							*===================================*/
		public get getChosen_fav_cat(){
			return this.chosen_fav_cat;
		}

		public get getChosen_fav_phrases(){
			return this.chosen_fav_phrases;
		}

		public get getCommon_cat(){
			return this.common_cat;
		}

		public get getCommon_phrases(){
			return this.common_phrases;
		}


}