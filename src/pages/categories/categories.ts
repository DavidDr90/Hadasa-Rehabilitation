import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, reorderArray, LoadingController } from 'ionic-angular';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';

import { Category } from '../../models/Category';
import { PhrasesPage } from '../phrases/phrases';

import * as Enums from '../../consts/enums';
import { StorageProvider } from '../../providers/storage/storage';
import { HomePage } from '../home/home';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { AddPhrasePage } from '../add-phrase/add-phrase';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  public phrasesPage: PhrasesPage;
  favProvider: FavoriteProvider;
  private categories: Category[];

  constructor(public categoryService: CategoryServiceProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

    this.categoryService.updateCategoriesArray();
    this.updateLocalCategoriesArray();

    this.favProvider = new FavoriteProvider(HomePage.favClass);

  }

  ionViewDidEnter(){
    this.updateLocalCategoriesArray();
  }

  private updateLocalCategoriesArray() {
    this.categories = this.categoryService.categories;
    //we ignore aboutMe category on this page
    let aboutMe = this.categories.find(cat => cat.name == Enums.ABOUT_ME_STRING);
    if (aboutMe != undefined) {
      var indexAM = this.categories.indexOf(aboutMe);
      if (indexAM > -1)
        this.categories.splice(indexAM, 1);
    }
  }

  //popup the category's phrases's page, if in edit mode -> ignore
  public openCategoryPhrases(category: Category) {
    if (this.editFlag)
      return; //no action
    //this.editFlag = false;
    //this.editButtonName = "עריכה";

    this.navCtrl.push(PhrasesPage, {
      parentCategory: category
    });
  }

  /**display the addPhrasePage and get the retrun object from the form.
   * Prompt the user to add a new category. This shows our AddPhrasePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  openAddPage() {
    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': Enums.ADD_OPTIONS.CATEGORY,
        'categoryID': Enums.ADD_OPTIONS.NO_CATEGORY
      });
    addModal.onDidDismiss(item => {
      if (item) {//if there is an object that return from the form
        let pro = this.categoryService.addCategory(item);//upload the new category to the DB
        pro.then(() => {
          this.updateLocalCategoriesArray()
        });
      }
    })
    addModal.present();//present the addPhrasePage
  }

  /*******************  Edit Mode section ****************/

  visible: boolean = true;
  editFlag: boolean = false;
  editButtonName: string = "עריכה";

  async edit() {
    if (this.editFlag) {
      this.editFlag = false;
      this.editButtonName = "עריכה";
      await this.categoryService.updateCategoriesArray(); //update DB
      this.updateLocalCategoriesArray();

    } else {
      this.editFlag = true;
      this.editButtonName = "סיים";
      await this.categoryService.updateCategoriesArray(); //update DB
      this.updateLocalCategoriesArray();
    }

  }

  /**
   * Using reorderArray to move element between positions in the array
   * then update order of each category using its new place in the array
   * @param index used to get element original and new positions from the HTML
   */
  async reorderItem(index) {
    console.log("edit -reorder from: " + index.from + "to: " + index.to);
    let temp = await this.categoryService.getCategories;

    console.log("edit reorder array size: " + temp.length);
    temp = reorderArray(temp, index);//reordering array
    //updating each category order field according to its array position
    let i = (index.from > index.to) ? index.to : index.from;
    let finish = (index.from > index.to) ? index.from : index.to;
    for (; i <= finish; i++) {
      await this.categoryService.setOrder(temp[i], i);
      console.log("updated i: " + i);
    }
    this.updateLocalCategoriesArray();

  }

  /**
   * Edit selected category using add-phrase page, 
   * the existing category is updated based on user modifications
   * @param item the category to edit
   */
  editCategory(item) {
    console.log("edit -contents");
    console.log(item);
    let categoryToEdit = item as Category;
    let addModal = this.modalCtrl.create(AddPhrasePage,
      {
        'fromWhere': Enums.ADD_OPTIONS.CATEGORY,
        'categoryID': categoryToEdit.id,
        'editCategory': true,
        'categoryToEdit': item,
      });
    addModal.present();//present the addPhrasePage
  }

  /**
   * Delete selected category after the user accepts the alert
   * @param item category to delete
   */
  async deleteCategory(item) {
    let loading = this.loadingCtrl.create({
      content: 'אנא המתן, אנחנו מוחקים'
    });
    const alert = this.alertCtrl.create({
      title: 'בטוח למחוק?',
      message: 'המחיקה היא סופית וכוללת את כול התוכן של הקטגוריה כולל הביטויים שבה!',
      buttons: [
        {
          text: 'בטל',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'מ ח ק',
          handler: () => {
            loading.present();
            let pro = this.categoryService.removeCategory(item);
            pro.then(() => {
              this.updateLocalCategoriesArray();
              loading.dismiss();

            })
          }
        }
      ]
    });
    alert.present();
  }

  /**change the visibility status when clicked
  * the unvisibale categories should by in a different style then the visible on
  * the user can see the unvisibale categories only in 'edit mode'
  */
  changeVisibility(item) {
    this.categoryService.changeVisibility(item);
  }


}

