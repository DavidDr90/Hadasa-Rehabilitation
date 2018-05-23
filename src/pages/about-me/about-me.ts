import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Category } from '../../models/Category';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Phrase } from '../../models/Phrase';
import * as Enums from '../../consts/enums';


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
    public navParams: NavParams,
    public modalCtrl: ModalController,
  ) {

    this.aboutMeCategory = this.categoryProvider.getCategoriesByName('aboutMe');
    if (this.aboutMeCategory instanceof Category)
      this.AsyncPhrasesloader();
    else
      //TODO:error in about me
      console.log("error in about me page");
  }

  //handler that add phrase and update the display 
  public addPhrase(phrase: Phrase) {
    setTimeout(() => {
      this.phrasesProvider.addPhrase(phrase);
      this.AsyncPhrasesloader()
    }, 500)
  }

  //handler that remove phrase and update the display 
  public removePhrase(phrase: Phrase) {
    setTimeout(() => {
      this.phrasesProvider.removePhrase(phrase);
      this.AsyncPhrasesloader()
    }, 500)
  }

  //initial phrases array for ngFor
  //promise is an Promise object that gets the return value only when its ready (await)
  // from phrase provider.
  //temp is an promise object that help to get the phrases from promis's resolve attr.
  private async AsyncPhrasesloader() {
    let promise = await this.phrasesProvider.getPhrases(this.aboutMeCategory);
    let temp = new Promise((resolve, reject) => {
      resolve(promise);
    });
    temp.then((data) => {
      this.phrases = data;
    })
  }

  /**display the addPhrasePage and get the retrun object from the form.
   * Prompt the user to add a new category. This shows our AddPhrasePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  openAddPage() {
    if (this.aboutMeCategory == undefined) {
      //TODO: handle the error
      console.log("error in getCategoriesByName()");
      return;
    }
    let addModal = this.modalCtrl.create('AddPhrasePage',
      {
        'fromWhere': Enums.ADD_OPTIONS.PHRASE,
        'categoryName': this.aboutMeCategory.id
      });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form
        //create new phrase for the about me category
        let newPhrase =
          new Phrase("", item.text, item.imagePath, item.categoryID, 0, item.audioFile, false);
        this.addPhrase(newPhrase);//upload the new phase to the DB and refresh the screen
      }
    })
    addModal.present();//present the addPhrasePage
  }

  //TODO: enter edit mode
  edit() {
    console.log("edit about me");
  }

}
