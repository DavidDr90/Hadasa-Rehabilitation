import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Category } from '../../models/Category';
import { Phrase } from '../../models/Phrase';

@IonicPage()
@Component({
  selector: 'page-phrases',
  templateUrl: 'phrases.html'
})
export class PhrasesPage {

  public parentCategory: Category;
  public phrases;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public phrasesProvider: PhrasesProvider) 
  {
    //get the parent category object from the clickable category.
    this.parentCategory = navParams.get('parentCategory');
    this.AsyncPhrasesloader()
  }
  

  //handler that add phrase and update the display 
  public addPhrase(phrase: Phrase)
  {
    setTimeout(()=>{
      this.phrasesProvider.addPhrase(phrase);
      this.AsyncPhrasesloader()
    }, 500)
  }  

    //handler that remove phrase and update the display 
    public removePhrase(phrase: Phrase)
    {
      setTimeout(()=>{
        this.phrasesProvider.removePhrase(phrase);
        this.AsyncPhrasesloader()
      }, 500)
    }  
  
  //initial phrases array for ngFor
  //promise is an Promise object that gets the return value only when its ready (await)
  // from phrase provider.
  //temp is an promise object that help to get the phrases from promis's resolve attr.
  public async AsyncPhrasesloader(){
    let promise = await this.phrasesProvider.getPhrases(this.parentCategory);
    let temp = new Promise ((resolve,reject) => {
      resolve(promise);
    });
    temp.then((data)=>{
      this.phrases = data;
    })
  }

}
