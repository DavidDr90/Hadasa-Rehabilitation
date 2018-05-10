
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
    this.AddNewPhrase("השם שלי","../assets/imgs/name.png");
    this.AddNewPhrase("הכתובת שלי","../assets/imgs/home.png");
    this.AddNewPhrase("מספר הפלאפון שלי","../assets/imgs/phone.png");
    this.AddNewPhrase("מקום העבודה שלי","../assets/imgs/work.png");
  }

  public AddNewPhrase(name: string, imageURL: string)
  {
    var phrase = new Phrase(name,imageURL);
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
