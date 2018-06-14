import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PhrasesProvider } from '../../providers/phrases/phrases';
import { Category } from '../../models/Category';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { Phrase } from '../../models/Phrase';
import * as Enums from '../../consts/enums';
import { PhrasesPage } from '../phrases/phrases';
import { ErrorProvider } from '../../providers/error/error';
import { AddPhrasePage } from '../add-phrase/add-phrase';


@Component({
  selector: 'page-about-me',
  templateUrl: 'about-me.html',
})
export class AboutMePage {

  public aboutMeCategory: Category
  public phrases;
  public subCategories;
  public hasSubCategories: boolean = false
  public showPhrases:boolean=false;
  public hasPhrases:boolean=false;

  constructor(public categoryProvider: CategoryServiceProvider,
    public db: FirebaseProvider,
    public phrasesProvider: PhrasesProvider,
    public auth: AutenticationProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public errorProvider: ErrorProvider ) {
    //getCategoriesByName return promise object
    let promise = this.categoryProvider.getCategoryByName(Enums.ABOUT_ME_STRING);
    promise.then((data) => {
      this.aboutMeCategory = data;
      this.aboutMeCategory as Category
      this.AsyncPhrasesloader();
    }).catch((e => {
      console.log("error import aboutme Category at aboutMe.ts");
      this.errorProvider.simpleTosat("error import aboutme Category");
    }))
  }

  //fire each time this page is entered.
  //
  ionViewDidEnter() {
    //this.AsyncPhrasesloader()
  }

  //initial phrases array for ngFor
  //promise is an Promise object that gets the return value only when its ready (await)
  // from phrase provider.
  //temp is an promise object that help to get the phrases from promis's resolve attr.
  private AsyncPhrasesloader() {
    let promise = this.phrasesProvider.getPhrases(this.aboutMeCategory);
    promise.then((data) => {
      this.phrases = data;
      this.phrasesProvider.phrases = data;
    })

    let promise1 = this.categoryProvider.updateCategoriesArray();
    promise1.then((data) => {
      this.subCategories = data.filter(cat => cat.parentCategoryID == this.aboutMeCategory.id);
      //dispaly the sub categories section only if there is at least one sub category
      this.hasSubCategories = (this.subCategories.length > 0) ? true : false;//check if there is a sub category
    })
  }

  //popup the category's phrases's page, using for sub-catergories
  public openCategoryPhrases(category: Category) {
    this.navCtrl.push(PhrasesPage, {
      parentCategory: category
    });
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

  /**display the addPhrasePage and get the retrun object from the form.
   * Prompt the user to add a new category. This shows our AddPhrasePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  openAddPage() {
    if (this.aboutMeCategory == undefined) {
      this.errorProvider.simpleTosat("על עצמי לא מוגדר");
      return;
    }
    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': Enums.ADD_OPTIONS.PHRASE,
        'categoryID': this.aboutMeCategory.id
      });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form
        //create new phrase for the about me category
        // let newPhrase =
        //   new Phrase("", item.text, item.imagePath, item.categoryID, 0, item.audioFile, false);
        this.addPhrase(item);//upload the new phase to the DB and refresh the screen
      }
    })
    addModal.present();//present the addPhrasePage
  }

  private editFlag: boolean = false;
  private editButtonName: string = "עריכה";

  // TODO: need to be like the methods in phrase page ts
  edit() {
    if( this.editFlag){
      this.editFlag = false;
      this.editButtonName = "עריכה";
      /**TODO:
       * after the user press the "סיים" button
       * save the local array changes in the DB array
       */
    }else{
      this.editFlag = true;
      this.editButtonName = "סיים";

    }
    
  }

  reorderItem(index){
    /**TODO:
     * let element = this.categoryService.getCategories[index.from];//save the draged category
     * change the array of ctegories as follow:
     * categpriesArrya.splice(index.from, 1);
     * categpriesArrya.splice(index.to, 1);
     */
  }

  editSubCategory(item){
    /**TODO:
     * enter the add phrase page with the clicked item
     * then allow the user to change any filed
     * in the end save the changes and update all the arrays and DB
     */
    console.log("edit sub");
    console.log(item);
  }

  deleteSubCategory(item){
    /**TODO:
     * use dor's function and delete the category 
     * and all the sub categories and phrases 
     * update the view
     */
    console.log("delete sub");
    console.log(item);
  }
  
  changeSubVisibility(item){
    /**TODO:
     * change the visibility status when clicked
     * the unvisibale categories should by in a different style then the visible on
     * the user can see the unvisibale categories only in 'edit mode'
     */
    console.log("visibility sub");
    console.log(item);
  }

  editPhrase(item){
    /**TODO:
     * enter the add phrase page with the clicked item
     * then allow the user to change any filed
     * in the end save the changes and update all the arrays and DB
     */
    console.log("edit phrase");
    console.log(item);
  }

  deletePhrase(item){
    /**TODO:
     * use dor's function and delete the category 
     * and all the sub categories and phrases 
     * update the view
     */
    console.log("delete phrase");
    console.log(item);
  }
  
  changeVisibility(item){
    /**TODO:
     * change the visibility status when clicked
     * the unvisibale categories should by in a different style then the visible on
     * the user can see the unvisibale categories only in 'edit mode'
     */
    console.log("visibility phrase");
    console.log(item);
  }

  /**
   * on click for the "show/hide phrases" button
   */
  public onClickShowPhrases(){
    console.log(this.showPhrases)
    this.showPhrases=!this.showPhrases;
  }

}
