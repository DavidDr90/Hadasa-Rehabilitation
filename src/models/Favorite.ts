import { Component } from '@angular/core';
import {Category} from '../models/Category';
import {Phrase} from '../models/Phrase';
import * as Enums from '../consts/enums';



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

		/**
		 * this function return an array maximum size Enums.NUM_FAVORITES_CAT of the user's
		 * favoriets categories chosen by him. the rest will be his common categories.
		 * @returns an array of the favorites categories.
		 */
		public getCatArray(){
			let categories:Category[];
			categories=[];
			//fill the array with chosen
			let i=0;
			for(i=0; i<this.chosen_fav_cat.length; i++)
				categories[i]=this.chosen_fav_cat[i];
			
			this.common_cat.sort(function(a, b){return b.views - a.views});//sort the common array from most viewed to least viewed
			
			//fill the rest of the array with common categories with the most viewed categories
			i=0;
			while(categories.length<Enums.NUM_FAVORITES_CAT&& i<this.common_cat.length){
				if(this.common_cat[i].isFav==false)
					categories[categories.length]=this.common_cat[i];
				i++;
			}
			return categories;

		}
		/**
		 * this function return an array maximum size Enums.NUM_FAVORITES_Phrases of the user's
		 * favoriets Phrases chosen by him. the rest will be his common Phrases.
		 * @returns an array of the favorites Phrases.
		 */
		public getPhrasesArray(){
			let phrases:Phrase[];
			phrases=[];
			//fill the array with chosen
			let i=0;
			for(i=0; i<this.chosen_fav_phrases.length; i++)
			phrases[i]=this.chosen_fav_phrases[i];

			this.common_phrases.sort(function(a, b){return b.views - a.views});//sort the common array from most viewed to least viewed
			
			//fill the rest of the array with common phrases with the most viewed categories
			i=0;
			while(phrases.length<Enums.NUM_FAVORITES_PHRASES&& i<this.common_phrases.length){
				if(this.common_phrases[i].isFav==false)
					phrases[phrases.length]=this.common_phrases[i];
				i++;
			}
			return phrases;

		}

}