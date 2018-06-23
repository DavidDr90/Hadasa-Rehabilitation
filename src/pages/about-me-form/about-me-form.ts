import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Category } from '../../models/Category';
import { TabsPage } from '../tabs/tabs';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { AppBuilderProvider } from '../../providers/app-builder/app-builder';


/*-------------------------------------------------------------------
              _                 _           _           _ 
             | |               (_)         | |         | |
           __| | ___ _ __  _ __ _  ___ __ _| |_ ___  __| |
          / _` |/ _ \ '_ \| '__| |/ __/ _` | __/ _ \/ _` |
         | (_| |  __/ |_) | |  | | (_| (_| | ||  __/ (_| |
          \__,_|\___| .__/|_|  |_|\___\__,_|\__\___|\__,_|
                    | |                                   
                    |_|          
 ---------------------------------------------------------------------*/


/**
 * the user will see this page if he haven't filled his aboutMe section
 */

@Component({
  selector: 'page-about-me-form',
  templateUrl: 'about-me-form.html',
})
export class AboutMeFormPage {

  public appBuilderProvider: AppBuilderProvider


  constructor(public categoryProvider: CategoryServiceProvider,
    public phrasesProvider: PhrasesProvider,
    public loadingCtrl: LoadingController, public navCtrl: NavController,
    public authentication: AutenticationProvider ) {

    this.appBuilderProvider = 
    new AppBuilderProvider(this.categoryProvider, this.phrasesProvider, loadingCtrl, authentication);
    this.appBuilderProvider.fillDB();
    navCtrl.setRoot(TabsPage);
  }

  aboutMeCategory: Category

  /*
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public categoryProvider: CategoryServiceProvider,
    public phrasesProvider: PhrasesProvider,
    public authentication: AutenticationProvider,
    public modalCtrl: ModalController,
    public auth: AutenticationProvider,
    private errorProvider: ErrorProvider) {


    this.categoryProvider.updateCategoriesArray();
    let promise = this.categoryProvider.getCategoryByName(Enums.ABOUT_ME_STRING);//try to get the about me category from the DB
    promise.then((data) => {
      console.log("about me Exists");
      return;
    },
      (data) => {
        this.aboutMeCategory =
          new Category(Enums.ABOUT_ME_STRING, "", "", this.authentication.user.email, "",
            0, false, Enums.DEFUALT_CATEGORY_COLOR, 1, true);

        this.categoryProvider.addCategory(this.aboutMeCategory);
        console.log("about me cat was created")
        this.errorProvider.simpleToast("aboutMe cat was created")
      })


    }*/

  //clicked the button, open add phrase form
  private clicked() {


    //fill phrases and add them to about-me category

  }

  //finish filling aboutMe forms and go to main page
  private finish() {
    //Checks if the email is verified.
    /*if (this.auth.isVerified())*/
    this.navCtrl.setRoot(TabsPage);

    /* else {
       this.errorProvider.simpleToast("You must verify your email to continue.")
       this.navCtrl.setRoot(AboutMeFormPage) 
     }*/

  }

  /** display the addPhrasePage and get the return object from the form.
   * Prompt the user to add a new phrase. This shows our AddPhrasePage in a
   * modal and then adds the new item to our data source if the user created one.
   * @param formWhere which page call the add page
   */
  openAddPage(fromWhere) {
    /*
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
    addModal.present();//present the addPhrasePage
    */
  }



}
