import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavPush, ModalController, AlertController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Category } from '../../models/Category';
import { TabsPage } from '../tabs/tabs';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Phrase } from '../../models/Phrase';
import * as Enums from '../../consts/enums';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { ErrorProvider } from '../../providers/error/error';
import { AddPhrasePage } from '../add-phrase/add-phrase';



/**
 * the user will see this page if he haven't filled his aboutMe section
 */

@Component({
  selector: 'page-about-me-form',
  templateUrl: 'about-me-form.html',
})
export class AboutMeFormPage {

  aboutMeCategory: Category

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public categoryProvider: CategoryServiceProvider,
    public phrasesProvider: PhrasesProvider,
    public authentication: AutenticationProvider,
    public modalCtrl: ModalController,
    public auth: AutenticationProvider,
    private errorProvider: ErrorProvider) {

    //TODO: display loading window

  


    //TODO: close the loading window before leaving the page



    //we stay on this page, so we need to create an aboutMe category
    //create new category aboutMe and add it to DB
    //TODO: broken, throw cnanot read 'email' of undefine
     this.aboutMeCategory =
       new Category(Enums.ABOUT_ME_STRING, "", "", this.authentication.user.email, "",
        0, false, Enums.DEFUALT_CATEGORY_COLOR, 1,true);
         this.categoryProvider.updateCategoriesArray();
    this.categoryProvider.addCategory(this.aboutMeCategory);
    console.log("about me cat was created")
    this.errorProvider.simpleTosat(("aboutMe cat was created"))
  }

  //clicked the button, open add phrase form
  private clicked() {
    this.categoryProvider.setIncludeAboutMe(true);
    this.categoryProvider.updateCategoriesArray();
    let promise = this.categoryProvider.getCategoryByName(Enums.ABOUT_ME_STRING);//try to get the about me category from the DB
    promise.then((data) => {
      this.aboutMeCategory = data;
      this.aboutMeCategory as Category;
      console.log("in click id is:" + this.aboutMeCategory.id + "okey?");
      this.phrasesProvider.getPhrases(this.aboutMeCategory);
    }).then(() => {
      console.log("im in second .zen")
      this.openAddPage(Enums.ADD_OPTIONS.PHRASE)
    })

    //fill phrases and add them to about-me category

  }

  //finish filling aboutMe forms and go to main page
  private finish() {

    //Checks if the email is verified.
    if (this.auth.isVerified())
      this.navCtrl.push(TabsPage);
    else {
      this.errorProvider.simpleTosat("You must verify your email to continue.")
      this.navCtrl.setRoot(AboutMeFormPage) 
    }

  }

  /** display the addPhrasePage and get the return object from the form.
   * Prompt the user to add a new phrase. This shows our AddPhrasePage in a
   * modal and then adds the new item to our data source if the user created one.
   * @param formWhere which page call the add page
   */
  openAddPage(fromWhere) {
    //need to make sure that the aboutMeCategory.id is the new about me category id from th DB
    //getCategoriesByName return promise object
    //this.verifyAboutMeCategory(false);//should be false here


    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': fromWhere,
        'categoryID': this.aboutMeCategory.id
      });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form
        //upload the new phrase to the DB
        this.phrasesProvider.addPhrase(item);//item is of type phrase
      }
    })
    addModal.present();//present the addPhrasePage*
  }


  
}
