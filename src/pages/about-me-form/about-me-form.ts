import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavPush, ModalController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Category } from '../../models/Category';
import { TabsPage } from '../tabs/tabs';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Phrase } from '../../models/Phrase';
import * as Enums from '../../consts/enums';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * the user will see this page if he haven't fill his about my section
 */

const ABOUT_ME_STRING = 'aboutMe';//TODO: before relese need to change to hebrew form

@IonicPage()
@Component({
  selector: 'page-about-me-form',
  templateUrl: 'about-me-form.html',
})
export class AboutMeFormPage {
  myCategory: Category

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public categoryProvider: CategoryServiceProvider,
    public phrasesProvider: PhrasesProvider,
    public modalCtrl: ModalController,
    public aAuth: AngularFireAuth) {

    this.myCategory = this.categoryProvider.getCategoriesByName(ABOUT_ME_STRING);//try to get the about me category from the DB

    //TODO: for some reason even if there is already about me category on the DB it not enter the next if
    //if the aboutMe category is filled skip this page and go to main page
    //else continue on this form page 
    if (this.myCategory instanceof Category) {
      navCtrl.pop();
      navCtrl.push(TabsPage);
    }

    //create new category about-me and add it to db
    this.myCategory =
      new Category(ABOUT_ME_STRING, "", "", this.aAuth.auth.currentUser.email, "", 0, false);
    this.categoryProvider.addCategory(this.myCategory);
  }

  //clicked the button, play audio
  private clicked() {
    this.openAddPage(Enums.ADD_OPTIONS.PHRASE)//fill phrases and add them to about-me category
  }

  //finished filling about-me cat, go to main page
  private finish() {
    //this.navCtrl.pop();
    this.navCtrl.push(TabsPage);
  }

  /** display the addPhrasePage and get the retrun object from the form.
   * Prompt the user to add a new phrase. This shows our AddPhrasePage in a
   * modal and then adds the new item to our data source if the user created one.
   * @param formWhere whitch page call the add page
   */
  openAddPage(fromWhere) {
    //TODO:
    //need to make sure that the myCategory.id is the new about me category id from th DB
    //use the getCategoriesByName() function after Dor's change
    let addModal = this.modalCtrl.create('AddPhrasePage',
      {
        'fromWhere': fromWhere,
        'categoryID': this.myCategory.id
      });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form
        //upload the new phrase to the DB
        this.phrasesProvider.addPhrase(item);//item is of type phrase
      }
    })
    addModal.present();//present the addPhrasePage
  }






}
