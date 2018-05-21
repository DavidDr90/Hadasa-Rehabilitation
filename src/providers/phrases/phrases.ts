
import { Injectable } from '@angular/core';
import { Phrase } from '../../models/Phrase';


@Injectable()
export class PhrasesProvider {

  private phrases;
  private categoryName;


  constructor() {
    this.phrases = [];
    this.initiate();
  }

  private initiate()
  {
    this.categoryName = "על עצמי"
    this.AddNewPhrase("השם שלי","../assets/imgs/name.png", "", "", 0, "", false);
    this.AddNewPhrase("הכתובת שלי","../assets/imgs/home.png", "", "", 0, "", false);
    this.AddNewPhrase("מספר הפלאפון שלי","../assets/imgs/phone.png", "", "", 0, "", false);
    this.AddNewPhrase("מקום העבודה שלי","../assets/imgs/work.png", "", "", 0, "", false);
  }

  public AddNewPhrase(name: string, imageURL: string, id: string, categoryID: string, views: number, audio: string, isFav:boolean)
  {
    var phrase = new Phrase(id, name,imageURL, categoryID, views, audio, isFav);
    this.phrases.push(phrase);
  }

  public GetPhrases()
  {
    return this.phrases;
  }

  public GetCategoryName()
  {
    return this.categoryName;
  }
}
