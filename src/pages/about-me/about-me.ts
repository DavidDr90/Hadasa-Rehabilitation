import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Category } from '../../models/Category';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TwitterAuthProvider_Instance } from '@firebase/auth-types';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Phrase } from '../../models/Phrase';

@IonicPage()
@Component({
  selector: 'page-about-me',
  templateUrl: 'about-me.html',
})
export class AboutMePage {

  public aboutMeCategory: Category
  public phrases;

  constructor(public categoryProvider: CategoryServiceProvider,
              public db: FirebaseProvider,
              public phrasesProvider: PhrasesProvider,
              public auth: AutenticationProvider,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.aboutMeCategory = this.categoryProvider.getCategoriesByName('aboutMe');
    this.AsyncPhrasesloader();
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
  private async AsyncPhrasesloader(){
    let promise = await this.phrasesProvider.getPhrases(this.aboutMeCategory);
    let temp = new Promise ((resolve,reject) => {
      resolve(promise);
    });
    temp.then((data)=>{
      this.phrases = data;
    })
  }


}
