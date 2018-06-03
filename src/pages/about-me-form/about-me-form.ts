import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavPush, ModalController, AlertController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Category } from '../../models/Category';
import { TabsPage } from '../tabs/tabs';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Phrase } from '../../models/Phrase';
import * as Enums from '../../consts/enums';
import { AngularFireAuth } from 'angularfire2/auth';



const ABOUT_ME_STRING = 'aboutMe';//TODO: before relese need to change to hebrew form
/**
 * the user will see this page if he haven't filled his aboutMe section
 */
@IonicPage()
@Component({
  selector: 'page-about-me-form',
  templateUrl: 'about-me-form.html',
})
export class AboutMeFormPage {

  aboutMeCategory : Category

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public categoryProvider: CategoryServiceProvider,
    public phrasesProvider: PhrasesProvider,
    public modalCtrl: ModalController, 
    public aAuth: AngularFireAuth)  {
    
    //TODO: display loading window

    //TODO: dor will create a function that chack if a user is exsist
    //for now this page move the user to the home page allways
    //if true go to home page (using promis.then)
    //if not go to the about me form (using promis.catch)
    /*let promise = this.categoryProvider.getCategoryByName(ABOUT_ME_STRING);//try to get the about me category from the DB
    promise.then((data) =>{
      this.aboutMeCategory = data;
      this.aboutMeCategory as Category
      //if the aboutMe category is filled skip this page and go to main page
      //else continue on this form page 
      //TODO: close the loading window before leaving the page
        navCtrl.push(TabsPage);
    })*/

    //look for aboutMe category and if its found go to HomepPage 
    //this.navCtrl.push(TabsPage);
    //this.verifyAboutMeCategory(true);//should be true here 

    //TODO: close the loading window before leaving the page

    

    //we stay on this page, so we need to create an aboutMe category
    //create new category aboutMe and add it to DB
    /*this.aboutMeCategory =
      new Category(ABOUT_ME_STRING, "", "", this.aAuth.auth.currentUser.email, "", 0, false);
    */this.categoryProvider.addCategory(this.aboutMeCategory);
    console.log("constructor ends")
  }

  //clicked the button, open add phrase form
  private clicked() {
    let promise = this.categoryProvider.getCategoryByName(ABOUT_ME_STRING);//try to get the about me category from the DB
    promise.then((data) =>{
      this.aboutMeCategory = data;
      this.aboutMeCategory as Category;
      console.log("in click id is:"  +this.aboutMeCategory.id+"okey?");
      this.phrasesProvider.getPhrases(this.aboutMeCategory);
    }).then(()=>{
      console.log("im in second .zen")  
    this.openAddPage(Enums.ADD_OPTIONS.PHRASE)
  })

    //fill phrases and add them to about-me category
    
  }

  //finish filling aboutMe forms and go to main page
  private finish() {
    //this.navCtrl.pop();
    this.navCtrl.push(TabsPage);
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


    let addModal = this.modalCtrl.create('AddPhrasePage',
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


  /**
   *  
   *  Uses categoryProvider and promises to look for aboutMe category
  and connects it to local aboutMeCategory variable.
  If navigate is set to true AND aboutMe category was found in DB 
  will navigate to homepage
  * @param navigateHome should we go toHomePage if aboutMe category exists
   */
  async verifyAboutMeCategory(navigateHome: boolean) {
    try{
      let aboutMeCategory = await this.categoryProvider.getCategoryByName(ABOUT_ME_STRING);//try to get the about me category from the DB
      console.log("after await");
      if(aboutMeCategory != undefined){
        this.aboutMeCategory as Category;
        console.log(this.aboutMeCategory.getID().toString())
        if(navigateHome)
          this.navCtrl.push(TabsPage);
      }
      console.log("data undefined");
    } catch(err) {
      console.log("aboutMe was not found:" + err)
    }


  }




}
