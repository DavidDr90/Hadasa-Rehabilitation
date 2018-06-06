import { Injectable } from '@angular/core';
import { Phrase } from '../../models/Phrase'
import { Category } from '../../models/Category'
import { User } from '../../models/user'
import { HomePage } from '../../pages/home/home';
import { PhrasesProvider } from '../phrases/phrases';
import { CategoryServiceProvider } from '../category-service/category-service';
import * as Enums from '../../consts/enums';

/**
 * this provider create the defult categorys and phrases when the app is first load
 */


@Injectable()
export class AppBuilderProvider {
  public userEmail
  private time: number


  constructor(public categoryProvider: CategoryServiceProvider, public phraseProvider: PhrasesProvider) {
    this.userEmail = HomePage.userEmail;
    this.time = 5000;
  }

  //===================================
  /**This method adds the category& his phrases to the DB.
   * @param category the category to be added to the DB.
   * @param phrases the array of the phrases of this category.
   * @param subCat the array of the sub categories of this category.
   * @param subPhrases the array of the arrays of the phrases each per sub category.
   * @param subFlag 1 if the category is a sub category and there is need to use "findSubCategoryByID".
   * @returns the ID of the added category in the DB.
   */
  add_new_cat_to_db(category: Category, phrases: Phrase[], subCat: Category[], subPhrases: Phrase[][], subFlag: number) {
    let catId: string;
    this.categoryProvider.addCategory(category);
    let promise;
    setTimeout(() => {
      if (subFlag == 1) {
        promise = this.categoryProvider.getSubCategoryByName(category.parentCategoryID, category.name)
      }
      else
        promise = this.categoryProvider.getCategoryByName(category.name);
      promise.then((data) => {
        let cat = data;
        cat as Category;
        catId = cat.id;
        for (let i = 0; i < phrases.length; i++) {
          phrases[i].order = i;
          phrases[i].categoryID = catId;
          this.phraseProvider.addPhrase(phrases[i]);
        }
        for (let i = 0; i < subCat.length; i++) {
          subCat[i].order = i;
          subCat[i].parentCategoryID = catId;
          this.add_new_cat_to_db(subCat[i], subPhrases[i], [], [], 1)
        }
      })
    }, this.time);

  }


  //===================================

  /**this method fill the DB for the user with the default categories&phrases
  */
  fillDB() {
    let cat;
    let phrases
    let subCats;
    let subPhrases;

    //TIMES CATEGORY
    cat = new Category("זמן", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 1, true)
    phrases = [];
    subCats = [new Category("ימות השבוע", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fday.PNG?alt=media&token=2c07b9c2-1b88-4e00-9f84-7012b6f76150", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 0, true),
    new Category("חודשים עבריים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 1, true),
    new Category("חודשים לועזיים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 2, true),
    new Category("חגים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true),
    new Category("אירועים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 4, true)]

    subPhrases = [[new Phrase("", "ראשון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fday.PNG?alt=media&token=2c07b9c2-1b88-4e00-9f84-7012b6f76150", "", 0, "", false, 0, true),
    new Phrase("", "שני", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fday.PNG?alt=media&token=2c07b9c2-1b88-4e00-9f84-7012b6f76150", "", 0, "", false, 0, true),
    new Phrase("", "שלישי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fday.PNG?alt=media&token=2c07b9c2-1b88-4e00-9f84-7012b6f76150", "", 0, "", false, 0, true),
    new Phrase("", "רביעי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fday.PNG?alt=media&token=2c07b9c2-1b88-4e00-9f84-7012b6f76150", "", 0, "", false, 0, true),
    new Phrase("", "חמישי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fday.PNG?alt=media&token=2c07b9c2-1b88-4e00-9f84-7012b6f76150", "", 0, "", false, 0, true),
    new Phrase("", "שישי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fday.PNG?alt=media&token=2c07b9c2-1b88-4e00-9f84-7012b6f76150", "", 0, "", false, 0, true),
    new Phrase("", "שבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fday.PNG?alt=media&token=2c07b9c2-1b88-4e00-9f84-7012b6f76150", "", 0, "", false, 0, true)],

    [new Phrase("", "תשרי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "חשוון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "כסליו", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "טבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "שבט", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "אדר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "ניסן", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "אייר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "סיוון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "תמוז", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "אב", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "אלול", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true)],

    [new Phrase("", "ינואר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "פברואר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "מרץ", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "אפריל", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "מאי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "יוני", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "יולי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "אוגוסט", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "ספטמבר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "אוקטובר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "נובמבר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true),
    new Phrase("", "דצמבר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2F%E2%80%8F%E2%80%8Fmonth.PNG?alt=media&token=5ffe95f6-d34a-4cfd-8f3e-e6b2611b846f", "", 0, "", false, 0, true)],

    [new Phrase("", "ראש השנה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "יום כיפור", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "סוכות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "חנוכה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "טו בשבט", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "פורים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "פסח", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "ספירת העומר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "לג בעומר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "שבועות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true)],

    [new Phrase("", "חתונה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "בר מצווה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "בת מצווה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "ברית", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "זבד הבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true),
    new Phrase("", "יום הולדת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/times%2Ftimes.PNG?alt=media&token=62f83829-73c0-438c-bbe7-a94443f0731a", "", 0, "", false, 0, true)]
    ];
    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0);

    //PLACES CATEGORY  
    cat = new Category("מקומות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 2, true)
    phrases = [];
    subCats = [new Category("חדרים בבית", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 0, true),
    new Category("בנק", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 1, true),
    new Category("קניות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Fshopping.PNG?alt=media&token=8e2dd23f-299b-4249-bd24-24f181d0ef15", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 2, true),
    new Category("מסעדות ובתי קפה", "", "", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true)]

    subPhrases = [[new Phrase("", "סלון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true),
    new Phrase("", "מטבח", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true),
    new Phrase("", "שירותים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true),
    new Phrase("", "אמבטיה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true),
    new Phrase("", "חדר שינה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true),
    new Phrase("", "חדר ילדים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true)],

    [new Phrase("", "היכן הכספומט הקרוב?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true),
    new Phrase("", "אני רוצה למשוך כסף מהחשבון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true),
    new Phrase("", "אני רוצה להפקיד כסף בחשבון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true),
    new Phrase("", "אני רוצה לפתוח חשבון בנק", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true),
    new Phrase("", "אני רוצה לקבל שירות מבנקאי/ת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/places%2Fplaces.PNG?alt=media&token=ce32254d-0fed-4e4b-ae35-35523290956f", "", 0, "", false, 0, true)],

    [new Phrase("", "אפשר למדוד?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Ftry_on.PNG?alt=media&token=e074d980-5013-4864-89f3-950c73d57a02", "", 0, "", false, 0, true),
    new Phrase("", "היכן תאי המדידה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Ffitting_room.PNG?alt=media&token=4ff29a91-15b9-48e6-b82d-f2466cdb1459", "", 0, "", false, 0, true),
    new Phrase("", "כמה זה עולה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Fprice_tag.PNG?alt=media&token=0ebc4362-aeaa-41e4-8f64-28a71bf45259", "", 0, "", false, 0, true),
    new Phrase("", "אפשר לשלם?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Fpay.PNG?alt=media&token=50df1d7e-dc60-413b-9c2f-9e86be89a01b", "", 0, "", false, 0, true)],

    [new Phrase("", "אפשר תפריט בבקשה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Fmenu.PNG?alt=media&token=5c410fde-72fa-44ed-a474-e61f80be096b", "", 0, "", false, 0, true),
    new Phrase("", "אפשר להזמין בבקשה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Forder.PNG?alt=media&token=161163bf-0154-4c68-bcc0-cd7ea0d86c99", "", 0, "", false, 0, true),
    new Phrase("", "מה מומלץ להזמין?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Frocommend.PNG?alt=media&token=fa5b88b8-ecb6-4dec-a652-8514b4a8c0f8", "", 0, "", false, 0, true),
    new Phrase("", "אפשר להזמין חשבון בבקשה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Fpay.PNG?alt=media&token=60cfeacb-161e-4d16-9106-2e3e1c746867", "", 0, "", false, 0, true),
    new Phrase("", "טעים מאוד", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Ftasty.PNG?alt=media&token=3417a74d-d4a3-4135-a7dc-4cf3755d7a91", "", 0, "", false, 0, true),
    new Phrase("", "לא טעים לי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Fnot%20tasty.PNG?alt=media&token=b929f780-b095-4bdb-8f1e-aa336950df93", "", 0, "", false, 0, true)]
    ];
    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0);


    //TRAVEL CATEGORY
    cat = new Category("נסיעות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fpublic_transport.PNG?alt=media&token=1d88c9c6-74ca-4cd2-af8b-316262066b17", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 2, true)

    phrases = [new Phrase("", "כיצד מגיעים ליעד?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fdestination.PNG?alt=media&token=5d304751-75b8-433d-a4fd-866c7744b818", "", 0, "", false, 0, true),
    new Phrase("", "כמה עולה הנסיעה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fcost.PNG?alt=media&token=de24f054-5144-4b80-9a03-40c468259268", "", 0, "", false, 0, true)];

    subCats = [new Category("רכב פרטי", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fpublic_transport.PNG?alt=media&token=1d88c9c6-74ca-4cd2-af8b-316262066b17", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 0, true),
    new Category("אוטובוס", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fbus.PNG?alt=media&token=78fcbe9b-c9ac-4a03-89f9-504a18d144a7", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 1, true),
    new Category("רכבת", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Ftrain.PNG?alt=media&token=3649588a-7674-4428-8935-4de8e024c650", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 2, true),
    new Category("מונית", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Ftaxi.PNG?alt=media&token=a4422fb9-00f8-4b75-84c3-aadc353ee915", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true)]

    subPhrases = [[new Phrase("", "היכן תחנת הדלק הקרובה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fpublic_transport.PNG?alt=media&token=1d88c9c6-74ca-4cd2-af8b-316262066b17", "", 0, "", false, 0, true),
    new Phrase("", "צריך טרמפ?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fpublic_transport.PNG?alt=media&token=1d88c9c6-74ca-4cd2-af8b-316262066b17", "", 0, "", false, 0, true),
    new Phrase("", "צריכה טרמפ?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fpublic_transport.PNG?alt=media&token=1d88c9c6-74ca-4cd2-af8b-316262066b17", "", 0, "", false, 0, true),
    new Phrase("", "היכן המוסך הקרוב?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fpublic_transport.PNG?alt=media&token=1d88c9c6-74ca-4cd2-af8b-316262066b17", "", 0, "", false, 0, true)],

    [new Phrase("", "היכן תחנת האוטובוס?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fstation.PNG?alt=media&token=0457acca-663b-45c1-9811-99d3980e12f3", "", 0, "", false, 0, true),
    new Phrase("", "מתי האוטובוס הבא צריך להגיע?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fclock.PNG?alt=media&token=522355b8-099d-462c-99a9-efeef1f774f9", "", 0, "", false, 0, true),
    new Phrase("", "באיזו תחנה לרדת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fdestination.PNG?alt=media&token=5d304751-75b8-433d-a4fd-866c7744b818", "", 0, "", false, 0, true)],

    [new Phrase("", "היכן תחנת הרכבת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Ftrain_station.PNG?alt=media&token=c3b523c3-d65f-4809-87bb-e313cefa7871", "", 0, "", false, 0, true),
    new Phrase("", "מתי הרכבת הבאה צריכה להגיע?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fclock.PNG?alt=media&token=522355b8-099d-462c-99a9-efeef1f774f9", "", 0, "", false, 0, true),
    new Phrase("", "באיזו תחנה לרדת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fdestination.PNG?alt=media&token=5d304751-75b8-433d-a4fd-866c7744b818", "", 0, "", false, 0, true)],

    [new Phrase("", "ברצוני להזמין מונית", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Ftaxi.PNG?alt=media&token=a4422fb9-00f8-4b75-84c3-aadc353ee915", "", 0, "", false, 0, true),
    new Phrase("", "תוכל להפעיל מונה בבקשה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Ftaxi.PNG?alt=media&token=a4422fb9-00f8-4b75-84c3-aadc353ee915", "", 0, "", false, 0, true),
    new Phrase("", "אצטרך עצירה נוספת בדרך", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Ftaxi.PNG?alt=media&token=a4422fb9-00f8-4b75-84c3-aadc353ee915", "", 0, "", false, 0, true)]
    ];
    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0);


    //FOOD CATEGORY
    cat = new Category("אוכל", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 2, true)

    phrases = [new Phrase("", "אני רוצה לאכול", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "להכין לך אוכל?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "סיימתי לאכול", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true)];

    subCats = [new Category("מוצרי חלב", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 0, true),
    new Category("מוצרי בשר", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 1, true),
    new Category("מאכלים כללים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 2, true),
    new Category("קינוחים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true),
    new Category("משקאות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true),
    new Category("ירקות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true),
    new Category("פירות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true),
    new Category("רטבים ממרחים ותבלינים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true)]

    subPhrases = [[new Phrase("", "גבינה צהובה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "גבינה בולגרית", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "טוסט גבינה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "פסטה ברוטב שמנת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true)],

    [new Phrase("", "צלי בשר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "סטייק אנטריקוט", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "צלעות כבש", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "כבד אווז", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true)],

    [new Phrase("", "אורז", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "פסטה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "מרק", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "פתיתים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true)],

    [new Phrase("", "עוגת שוקולד", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "עוגת ביסקוויטים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "עוגת לוטוס", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "עוגיות שוקולד צ'יפס", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true)],

    [new Phrase("", "קולה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "מים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "פיוז טי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "ספרייט", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true)],

    [new Phrase("", "מלפפון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "עגבניה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "גזר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "גמבה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true)],

    [new Phrase("", "תפוח", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "אבטיח", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "מלון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "בננה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true)],

    [new Phrase("", "קטשופ", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "צ'ילי מתוק", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "ממרח שוקולד", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true),
    new Phrase("", "מלח ופלפל שחור", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/food%2Ffood.PNG?alt=media&token=eb93a91d-bc79-442c-bcd3-7284ff5ed6a6", "", 0, "", false, 0, true)]
    ];
    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0);

    //FEELINGS CATEGORY
    cat = new Category("רגשות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2F%E2%80%8F%E2%80%8Ffeelings.PNG?alt=media&token=921bff5c-c031-41b3-b1d0-efe4c622e542", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true)

    phrases = [new Phrase("", "עצב", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Fsad.PNG?alt=media&token=8a4bdf52-f492-484d-ba11-6ccbb9f66cc0", "", 0, "", false, 0, true),
    new Phrase("", "צחוק", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Flaugh.PNG?alt=media&token=f576ff92-73f0-42dd-85dc-8a297d451e82", "", 0, "", false, 0, true),
    new Phrase("", "עצבנות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Fangry.PNG?alt=media&token=0ecb050c-b1a1-4194-be54-26e6211c0c78", "", 0, "", false, 0, true),
    new Phrase("", "הפתעה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2F%E2%80%8F%E2%80%8Fsuprised.PNG?alt=media&token=054d3372-15c5-4908-8bc0-7ee7b34de013", "", 0, "", false, 0, true),
    new Phrase("", "שמחה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Fhappy.PNG?alt=media&token=bfe22262-b0c3-4f0c-883a-c61be196d1d7", "", 0, "", false, 0, true),
    new Phrase("", "בהלה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Ffreaking_out.PNG?alt=media&token=2f35b76c-89d6-49d9-b676-e751d8391f1e", "", 0, "", false, 0, true),
    new Phrase("", "אדישות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2F%E2%80%8F%E2%80%8Fapathetic.PNG?alt=media&token=9880b9ee-7a16-4c52-a9f6-787e9b52b4fc", "", 0, "", false, 0, true)];
    this.add_new_cat_to_db(cat, phrases, [], [], 0);

    //PERSONAL STUFF CATEGORY
    cat = new Category("חפצים אישיים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Fpersonal%20stuff.PNG?alt=media&token=bd9ebcf2-edbe-4288-b716-d76f2d57d757", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 4, true)

    phrases = [new Phrase("", "פלאפון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Ftelephone.PNG?alt=media&token=8facc469-58e1-4cbf-97c8-58e35ef03f98", "", 0, "", false, 0, true),
    new Phrase("", "מפתחות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Fkeys.PNG?alt=media&token=6d1e23a0-3d1b-491d-8cad-06d3933c2991", "", 0, "", false, 0, true),
    new Phrase("", "שעון יד", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2F%E2%80%8F%E2%80%8FhandWatch.PNG?alt=media&token=f700ab57-b100-4859-93c9-f2df5573b6fb", "", 0, "", false, 0, true),
    new Phrase("", "משקפיים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2F%E2%80%8F%E2%80%8Fglasses.PNG?alt=media&token=005fca74-de01-4d3c-927a-90b3896684ca", "", 0, "", false, 0, true),
    new Phrase("", "משקפי שמש", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Fsun_glasses.PNG?alt=media&token=e046d0d9-08d2-4a68-8da6-c4fbff001275", "", 0, "", false, 0, true),
    new Phrase("", "ארנק", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2F%E2%80%8F%E2%80%8Fwallet.PNG?alt=media&token=b197d718-8f9d-4055-8136-a316746338a8", "", 0, "", false, 0, true),
    new Phrase("", "כסף", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Fmoney.PNG?alt=media&token=63622875-4e2a-496d-ad71-646f00960058", "", 0, "", false, 0, true)];

    this.add_new_cat_to_db(cat, phrases, [], [], 0);

    //MEDICINE CATEGORY
    cat = new Category("רפואה", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%E2%80%8F%E2%80%8Fmadical.PNG?alt=media&token=62e9e247-658e-454d-87aa-6886aa0bab99", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 5, true)

    phrases = [new Phrase("", "סקלת כאב", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%20scale.PNG?alt=media&token=383577d6-fcda-4e1f-99be-8663747010ec", "", 0, "", false, 0, true),
    new Phrase("", "אני רוצה להזמין תור לרופא", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%E2%80%8F%E2%80%8Fmadical.PNG?alt=media&token=62e9e247-658e-454d-87aa-6886aa0bab99", "", 0, "", false, 0, true),
    new Phrase("", "אני רוצה לקבל הפנייה למיון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%E2%80%8F%E2%80%8Fmadical.PNG?alt=media&token=62e9e247-658e-454d-87aa-6886aa0bab99", "", 0, "", false, 0, true)];

    subCats = [new Category("ראש", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2Fheadache.PNG?alt=media&token=afedb4f0-fc3a-4f05-96b6-1f0b79db71ca", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 0, true),
    new Category("בטן", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fstomach.PNG?alt=media&token=7275b1fd-c78f-4c62-9416-b492be982dce", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 1, true),
    new Category("אף אוזן גרון", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fotolaryngology%2Fotolaryngology.PNG?alt=media&token=f35024a9-3735-4f95-af28-6b668da2f2bf", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 2, true),
    new Category("חזה", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fchest%2Fchest.PNG?alt=media&token=c4b85e58-d4a9-4d8f-8db8-f56d9eda4893", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true),
    new Category("מצב נפשי", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Fmental_health.PNG?alt=media&token=786e2909-457a-48ec-bc0b-f1da4af93660", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true),
    new Category("רופאים ואנשי מקצוע", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fdoctors%2Fdoctors.PNG?alt=media&token=b52be6c0-cc95-44d2-ac5b-0c18b595de23", " ", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true),
    new Category("בדיקות רפואיות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2F%E2%80%8F%E2%80%8Fmedica_test.PNG?alt=media&token=52ae7fac-4634-48c0-b5da-de6cd6eb96db", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true),
    new Category("סוגי כאב", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%2Fpain.PNG?alt=media&token=e8b2f4da-cdb3-4068-941b-9d23fd3d3250", this.userEmail, "", 0, false, Enums.DEFUALT_CATEGORY_COLOR, 3, true)]

    subPhrases = [[new Phrase("", "כאב ראש", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2Fheadache.PNG?alt=media&token=afedb4f0-fc3a-4f05-96b6-1f0b79db71ca", "", 0, "", false, 0, true),
    new Phrase("", "סחרחורת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2Fdizziness.PNG?alt=media&token=9cbb1c67-b3f8-4f05-8c94-bd559ff2768c", "", 0, "", false, 0, true),
    new Phrase("", "עייפות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2F%E2%80%8F%E2%80%8Fsleepy.PNG?alt=media&token=b581e0b8-486d-4e2e-ae77-9532bff5a91c", "", 0, "", false, 0, true),
    new Phrase("", "חום גבוהה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2F%E2%80%8F%E2%80%8Fmedical_thermometer.PNG?alt=media&token=42bc7671-3857-429d-9d58-81d6363c4f38", "", 0, "", false, 0, true)],

    [new Phrase("", "כאב בטן", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fstomach.PNG?alt=media&token=7275b1fd-c78f-4c62-9416-b492be982dce", "", 0, "", false, 0, true),
    new Phrase("", "הקאות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fvomit.PNG?alt=media&token=7e1dbeb1-1b01-4183-ab90-2d86fc824dfe", "", 0, "", false, 0, true),
    new Phrase("", "שלשולים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fdiarrhea.PNG?alt=media&token=f1006241-be46-40b8-91cc-4624691bfac5", "", 0, "", false, 0, true),
    new Phrase("", "כאבי מחזור", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fmenses.PNG?alt=media&token=0930a278-c87c-4add-8c79-01011973942f", "", 0, "", false, 0, true)],

    [new Phrase("", "צינון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fotolaryngology%2Fnose%20pain.PNG?alt=media&token=dbfc4da9-2957-4247-989b-5a5575494218", "", 0, "", false, 0, true),
    new Phrase("", "כאב גרון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fotolaryngology%2Fsore_throat.PNG?alt=media&token=95f56244-ed00-444a-912f-2536a7f4c6de", "", 0, "", false, 0, true),
    new Phrase("", "כאב אוזניים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fotolaryngology%2Fear_pain.PNG?alt=media&token=03d6c863-3224-42ec-b4cc-2660b93d1bd4", "", 0, "", false, 0, true)],

    [new Phrase("", "כאב בחזה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fchest%2Fchest.PNG?alt=media&token=c4b85e58-d4a9-4d8f-8db8-f56d9eda4893", "", 0, "", false, 0, true),
    new Phrase("", "צרבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fchest%2Fheartburn.PNG?alt=media&token=54023580-40e9-431a-84b8-f885751b0fff", "", 0, "", false, 0, true)],

    [new Phrase("", "דיכאון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2F%E2%80%8F%E2%80%8Fdepression.PNG?alt=media&token=c3a3affb-f6ae-4f23-a6bd-0cb137f33033", "", 0, "", false, 0, true),
    new Phrase("", "בדידות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Floneliness.PNG?alt=media&token=3ea7007b-e2ac-48ee-a91c-0b6e5d0837ee", "", 0, "", false, 0, true),
    new Phrase("", "חרדה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Fanxiety_panic.PNG?alt=media&token=b71ebc5e-a1b2-42bf-bb79-38294589a7af", "", 0, "", false, 0, true),
    new Phrase("", "קשיים בהרדמות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Finsomnia.PNG?alt=media&token=61741bab-e173-466a-9b3e-a4ede96486f1", "", 0, "", false, 0, true),
    new Phrase("", "מחשבות אובדניות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Fsuicidal.PNG?alt=media&token=e85534d3-65be-406c-a2c3-72a850698fce", "", 0, "", false, 0, true)],

    [new Phrase("", "נוירולוג", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fdoctors%2Fdoctors.PNG?alt=media&token=b52be6c0-cc95-44d2-ac5b-0c18b595de23", "", 0, "", false, 0, true),
    new Phrase("", "קלינאית תקשורת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fdoctors%2Fdoctors.PNG?alt=media&token=b52be6c0-cc95-44d2-ac5b-0c18b595de23", "", 0, "", false, 0, true),
    new Phrase("", "רופא משפחה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fdoctors%2Fdoctors.PNG?alt=media&token=b52be6c0-cc95-44d2-ac5b-0c18b595de23", "", 0, "", false, 0, true),
    new Phrase("", "כירוג", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fdoctors%2Fdoctors.PNG?alt=media&token=b52be6c0-cc95-44d2-ac5b-0c18b595de23", "", 0, "", false, 0, true),
    new Phrase("", "עובדת סוציאלית", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fdoctors%2Fdoctors.PNG?alt=media&token=b52be6c0-cc95-44d2-ac5b-0c18b595de23", "", 0, "", false, 0, true),
    new Phrase("", "פיזיותרפיסט", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fdoctors%2Fdoctors.PNG?alt=media&token=b52be6c0-cc95-44d2-ac5b-0c18b595de23", "", 0, "", false, 0, true)],

    [new Phrase("", "בדיקות דם", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2Fblood_test.PNG?alt=media&token=578016f0-4eb6-4889-8fa0-684d0de712d4", "", 0, "", false, 0, true),
    new Phrase("", "מרשם לתרופות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2F%E2%80%8F%E2%80%8Fpreception.PNG?alt=media&token=f5f457ef-fecc-47d8-b63f-bbabf4372d69", "", 0, "", false, 0, true),
    new Phrase("", "חיסון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2F%E2%80%8F%E2%80%8FVaccination.PNG?alt=media&token=527b43e3-d046-4cff-a380-027058ad4272", "", 0, "", false, 0, true),
    new Phrase("", "צילום", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2Fxray.PNG?alt=media&token=32a5843e-4fae-4cc3-807a-56a9a27848dc", "", 0, "", false, 0, true)],

    [new Phrase("", "מגרד", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%2Fitchy.PNG?alt=media&token=0c074821-80c5-4b47-90fe-75afbc7229aa", "", 0, "", false, 0, true),
    new Phrase("", "שורף", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%2Fburning_pain.PNG?alt=media&token=ed1c5a18-7d0a-4635-9fbf-e4bd769869b6", "", 0, "", false, 0, true),
    new Phrase("", "דוקר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%2Fstabbing_pain.PNG?alt=media&token=8d32bd24-cc3f-4f23-80fc-ff4ba4cd8a03", "", 0, "", false, 0, true)]
    ];
    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0);

    this.categoryProvider.updateCategoriesArray();

  }


}
