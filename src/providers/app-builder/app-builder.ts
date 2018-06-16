import { Injectable } from '@angular/core';
import { Phrase } from '../../models/Phrase'
import { Category } from '../../models/Category'
import { User } from '../../models/user'
import { HomePage } from '../../pages/home/home';
import { PhrasesProvider } from '../phrases/phrases';
import { CategoryServiceProvider } from '../category-service/category-service';
import * as Enums from '../../consts/enums';
import { LoadedModule } from 'ionic-angular/util/module-loader';
import { LoadingController } from 'ionic-angular';

/**
 * this provider create the defult categorys and phrases when the app is first load
 */


@Injectable()
export class AppBuilderProvider {
  public userEmail
  private time: number
  loading;

  constructor(public categoryProvider: CategoryServiceProvider, public phraseProvider: PhrasesProvider, public loadingCtrl:LoadingController) {
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
  add_new_cat_to_db(category: Category, phrases: Phrase[], subCat: Category[], subPhrases: Phrase[][], subFlag: number, isLast:boolean) {
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
          this.add_new_cat_to_db(subCat[i], subPhrases[i], [], [], 1, false)
        }
      })
      if (isLast==true)
        this.loading.dismiss();

    }, this.time);

  }


  //===================================

  /**this method fill the DB for the user with the default categories&phrases
  */
  fillDB() {
    this.loading = this.loadingCtrl.create({
      content: 'אנא המתן'
    });
   this.loading.present();
    let cat;
    let phrases
    let subCats;
    let subPhrases;

    //TIMES CATEGORY
    cat = new Category("זמן", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", this.userEmail, "", 0, false, null, 1, true)
    phrases = [];
    subCats = [
      new Category("ימות השבוע", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fday.png?alt=media&token=92e0ecd2-1435-438f-8528-d6c14fcb1b08", this.userEmail, "", 0, false, null, 0, true),
      new Category("חודשים עבריים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", this.userEmail, "", 0, false, null, 1, true),
      new Category("חודשים לועזיים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", this.userEmail, "", 0, false, null, 2, true),
      new Category("חגים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", this.userEmail, "", 0, false, null, 3, true),
      new Category("אירועים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", this.userEmail, "", 0, false, null, 4, true)
    ]

    subPhrases = [
      [
        new Phrase("", "ראשון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fday.png?alt=media&token=92e0ecd2-1435-438f-8528-d6c14fcb1b08", "", 0, "", false, 0, true),
        new Phrase("", "שני", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fday.png?alt=media&token=92e0ecd2-1435-438f-8528-d6c14fcb1b08", "", 0, "", false, 0, true),
        new Phrase("", "שלישי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fday.png?alt=media&token=92e0ecd2-1435-438f-8528-d6c14fcb1b08", "", 0, "", false, 0, true),
        new Phrase("", "רביעי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fday.png?alt=media&token=92e0ecd2-1435-438f-8528-d6c14fcb1b08", "", 0, "", false, 0, true),
        new Phrase("", "חמישי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fday.png?alt=media&token=92e0ecd2-1435-438f-8528-d6c14fcb1b08", "", 0, "", false, 0, true),
        new Phrase("", "שישי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fday.png?alt=media&token=92e0ecd2-1435-438f-8528-d6c14fcb1b08", "", 0, "", false, 0, true),
        new Phrase("", "שבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fday.png?alt=media&token=92e0ecd2-1435-438f-8528-d6c14fcb1b08", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "תשרי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%AA%D7%A9%D7%A8%D7%99.mp3?alt=media&token=3c655168-f690-464f-8357-de63c00b108e", false, 0, true),
        new Phrase("", "חשוון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%97%D7%A9%D7%95%D7%95%D7%9F.mp3?alt=media&token=d7a2ab4b-402b-4138-917d-f88a9077bf67", false, 0, true),
        new Phrase("", "כסליו", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%9B%D7%A1%D7%9C%D7%99%D7%95.mp3?alt=media&token=013917cc-b8bd-4a6a-ae1d-cea79acb69d9", false, 0, true),
        new Phrase("", "טבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%98%D7%91%D7%AA.mp3?alt=media&token=effb9845-de91-4a24-b71e-daa2d592a966", false, 0, true),
        new Phrase("", "שבט", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%A9%D7%91%D7%98.mp3?alt=media&token=dd5b9404-ab45-4145-b50f-fc21587e6a0f", false, 0, true),
        new Phrase("", "אדר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%90%D7%93%D7%A8.mp3?alt=media&token=1dac9409-ec13-427a-8a71-1e198b087e4c", false, 0, true),
        new Phrase("", "ניסן", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%A0%D7%99%D7%A1%D7%9F.mp3?alt=media&token=766284f5-e12e-414e-96aa-e7a4d1c46a99", false, 0, true),
        new Phrase("", "אייר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%90%D7%99%D7%99%D7%A8.mp3?alt=media&token=12047be4-dfe2-4f7e-8d5e-6f0a2d2bc84c", false, 0, true),
        new Phrase("", "סיוון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%A1%D7%99%D7%95%D7%95%D7%9F.mp3?alt=media&token=fe6dd408-8e86-45fe-9658-f893a85ced3d", false, 0, true),
        new Phrase("", "תמוז", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%AA%D7%9E%D7%95%D7%96.mp3?alt=media&token=19d72f22-ba7e-4bf1-82ac-3a3fc84dd7d5", false, 0, true),
        new Phrase("", "אב", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%90%D7%91.mp3?alt=media&token=eeaaee85-7bb7-46e0-bfd1-5be514f01075", false, 0, true),
        new Phrase("", "אלול", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%90%D7%9C%D7%95%D7%9C.mp3?alt=media&token=66675158-51f2-493d-a3db-dde124577649", false, 0, true)
      ],

      [
        new Phrase("", "ינואר - 1", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%99%D7%A0%D7%95%D7%90%D7%A8.mp3?alt=media&token=d30c262c-2397-44f4-9af3-52cda9662d42", false, 0, true),
        new Phrase("", "פברואר - 2", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%A4%D7%91%D7%A8%D7%95%D7%90%D7%A8.mp3?alt=media&token=bb97c10e-733a-4016-85fb-7ceeeeb88b0b", false, 0, true),
        new Phrase("", "מרץ - 3", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%9E%D7%A8%D7%A5.mp3?alt=media&token=b8185262-bc74-4e95-bdc2-c8d9bcf8b039", false, 0, true),
        new Phrase("", "אפריל - 4", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%90%D7%A4%D7%A8%D7%99%D7%9C.mp3?alt=media&token=84526715-476f-4501-97fd-e1dd8c71c2d0", false, 0, true),
        new Phrase("", "מאי - 5", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%9E%D7%90%D7%99.mp3?alt=media&token=e46fec94-c7b2-4f1c-b870-4875edce6183", false, 0, true),
        new Phrase("", "יוני - 6", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%99%D7%95%D7%A0%D7%99.mp3?alt=media&token=a6f3b850-3ef6-4ce2-b402-7e2845deacc0", false, 0, true),
        new Phrase("", "יולי - 7", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%99%D7%95%D7%9C%D7%99.mp3?alt=media&token=46b3c1bb-93c8-49e0-bfb5-f73ab6ecbbaf", false, 0, true),
        new Phrase("", "אוגוסט - 8", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%90%D7%95%D7%92%D7%95%D7%A1%D7%98.mp3?alt=media&token=ed50e1d5-c137-4ddd-992d-1637736a656b", false, 0, true),
        new Phrase("", "ספטמבר - 9", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%A1%D7%A4%D7%98%D7%9E%D7%91%D7%A8.mp3?alt=media&token=aca468aa-db9d-46a5-aaec-5171e290a421", false, 0, true),
        new Phrase("", "אוקטובר - 10", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%90%D7%95%D7%A7%D7%98%D7%95%D7%91%D7%A8.mp3?alt=media&token=99c67f97-fdc5-4a3c-a73d-34611eb3b0b6", false, 0, true),
        new Phrase("", "נובמבר - 11", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%A0%D7%95%D7%91%D7%9E%D7%91%D7%A8.mp3?alt=media&token=a152be5f-3efd-43ed-8c8e-4fd9de92bc17", false, 0, true),
        new Phrase("", "דצמבר - 12", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fmonth.png?alt=media&token=678700df-b2ee-4dc4-a08b-6c492cf8d50e", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%93%D7%A6%D7%9E%D7%91%D7%A8.mp3?alt=media&token=c64bbd2e-4164-4c07-8555-6237776e0f60", false, 0, true)
      ],

      [
        new Phrase("", "ראש השנה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%A8%D7%90%D7%A9%20%D7%94%D7%A9%D7%A0%D7%94.mp3?alt=media&token=b49e2713-ee12-44af-86c2-2163f2c0f471", false, 0, true),
        new Phrase("", "יום כיפור", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%9B%D7%99%D7%A4%D7%95%D7%A8.mp3?alt=media&token=c514eba4-9a3b-45ba-a1df-91119f1faee4", false, 0, true),
        new Phrase("", "סוכות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%A1%D7%95%D7%9B%D7%95%D7%AA.mp3?alt=media&token=75d5b4bd-b95c-4348-9623-31a4ab2d8005", false, 0, true),
        new Phrase("", "שמחת תורה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%A9%D7%9E%D7%97%D7%AA%20%D7%AA%D7%95%D7%A8%D7%94.mp3?alt=media&token=37b4eea3-7961-40e0-91b3-c30347f5c1a6", false, 0, true),
        new Phrase("", "חנוכה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%97%D7%A0%D7%95%D7%9B%D7%94.mp3?alt=media&token=3c66b2a8-b28a-4afb-bc12-8147b768233b", false, 0, true),
        new Phrase("", "טו בשבט", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%98%D7%95%20%D7%91%D7%A9%D7%91%D7%98.mp3?alt=media&token=8afeec60-a8c1-4e53-afc1-d8058f3ab979", false, 0, true),
        new Phrase("", "פורים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%A4%D7%95%D7%A8%D7%99%D7%9D.mp3?alt=media&token=622f443f-0cd4-4399-b02d-9e694fe54ca4", false, 0, true),
        new Phrase("", "פסח", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%A4%D7%A1%D7%97.mp3?alt=media&token=22677cc7-b6f7-4b3a-a9cd-9d14a4d77914", false, 0, true),
        new Phrase("", "יום השואה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%94%D7%A9%D7%95%D7%90%D7%94.mp3?alt=media&token=7134b2f0-1a0c-48f3-99fa-beb33c7d0154", false, 0, true),
        new Phrase("", "יום הזיכרון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%94%D7%96%D7%99%D7%9B%D7%A8%D7%95%D7%9F.mp3?alt=media&token=cd8276f2-c550-460f-9511-f6a3ae03f59a", false, 0, true),
        new Phrase("", "יום העצמאות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%94%D7%A2%D7%A6%D7%9E%D7%90%D7%95%D7%AA.mp3?alt=media&token=e7d25b9f-cc64-42fb-8c42-a76d09646c0d", false, 0, true),
        new Phrase("", "לג בעומר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%9C%D7%92%20%D7%91%D7%A2%D7%95%D7%9E%D7%A8.mp3?alt=media&token=0b690764-691b-4a7f-946e-5c8f6dac4474", false, 0, true),
        new Phrase("", "שבועות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%A9%D7%91%D7%95%D7%A2%D7%95%D7%AA.mp3?alt=media&token=00eab84e-50a4-4852-bb49-817304e1d6d6", false, 0, true)
      ],

      [
        new Phrase("", "חתונה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "בר מצווה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "בת מצווה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "ברית", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "זבד הבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "יום הולדת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true)
      ]
    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0, false);

    //PLACES CATEGORY  
    cat = new Category("מקומות", "", "", this.userEmail, "", 0, false, null, 2, true)
    phrases = [];
    subCats = [
      new Category("חדרים בבית", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("בנק", "", "", this.userEmail, "", 0, false, null, 1, true),
      new Category("קניות", "", "", this.userEmail, "", 0, false, null, 2, true),
      new Category("מסעדות ובתי קפה", "", "", this.userEmail, "", 0, false, null, 3, true)
    ]

    subPhrases = [
      [
        new Phrase("", "סלון", "", "", 0, "", false, 0, true),
        new Phrase("", "מטבח", "", "", 0, "", false, 0, true),
        new Phrase("", "שירותים", "", "", 0, "", false, 0, true),
        new Phrase("", "אמבטיה", "", "", 0, "", false, 0, true),
        new Phrase("", "חדר שינה", "", "", 0, "", false, 0, true),
        new Phrase("", "חדר ילדים", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "היכן הכספומט הקרוב?", "", "", 0, "", false, 0, true),
        new Phrase("", "אני רוצה למשוך כסף מהחשבון", "", "", 0, "", false, 0, true),
        new Phrase("", "אני רוצה להפקיד כסף בחשבון", "", "", 0, "", false, 0, true),
        new Phrase("", "אני רוצה לפתוח חשבון בנק", "", "", 0, "", false, 0, true),
        new Phrase("", "אני רוצה לקבל שירות מבנקאי/ת", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "אפשר למדוד?", "", "", 0, "", false, 0, true),
        new Phrase("", "היכן תאי המדידה?", "", "", 0, "", false, 0, true),
        new Phrase("", "כמה זה עולה?", "", "", 0, "", false, 0, true),
        new Phrase("", "אפשר לשלם?", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "אפשר תפריט בבקשה", "", "", 0, "", false, 0, true),
        new Phrase("", "אפשר להזמין בבקשה", "", "", 0, "", false, 0, true),
        new Phrase("", "מה מומלץ להזמין?", "", "", 0, "", false, 0, true),
        new Phrase("", "אפשר להזמין חשבון בבקשה?", "", "", 0, "", false, 0, true),
        new Phrase("", "טעים מאוד", "", "", 0, "", false, 0, true),
        new Phrase("", "לא טעים לי", "", "", 0, "", false, 0, true)
      ]
    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0, false);


    //TRAVEL CATEGORY
    cat = new Category("נסיעות", "", "", this.userEmail, "", 0, false, null, 2, true)

    phrases = [
      new Phrase("", "כיצד מגיעים ליעד?", "", "", 0, "", false, 0, true),
      new Phrase("", "כמה עולה הנסיעה?", "", "", 0, "", false, 0, true)
    ];

    subCats = [
      new Category("רכב פרטי", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("אוטובוס", "", "", this.userEmail, "", 0, false, null, 1, true),
      new Category("רכבת", "", "", this.userEmail, "", 0, false, null, 2, true),
      new Category("מונית", "", "", this.userEmail, "", 0, false, null, 3, true)
    ]

    subPhrases = [
      [
        new Phrase("", "היכן תחנת הדלק הקרובה?", "", "", 0, "", false, 0, true),
        new Phrase("", "צריך טרמפ?", "", "", 0, "", false, 0, true),
        new Phrase("", "צריכה טרמפ?", "", "", 0, "", false, 0, true),
        new Phrase("", "היכן המוסך הקרוב?", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "היכן תחנת האוטובוס?", "", "", 0, "", false, 0, true),
        new Phrase("", "מתי האוטובוס הבא צריך להגיע?", "", "", 0, "", false, 0, true),
        new Phrase("", "באיזו תחנה לרדת?", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "היכן תחנת הרכבת?", "", "", 0, "", false, 0, true),
        new Phrase("", "מתי הרכבת הבאה צריכה להגיע?", "", "", 0, "", false, 0, true),
        new Phrase("", "באיזו תחנה לרדת?", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "ברצוני להזמין מונית", "", "", 0, "", false, 0, true),
        new Phrase("", "תוכל להפעיל מונה בבקשה", "", "", 0, "", false, 0, true),
        new Phrase("", "אצטרך עצירה נוספת בדרך", "", "", 0, "", false, 0, true)
      ]
    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0, false);


    //FOOD CATEGORY
    cat = new Category("אוכל", "", "", this.userEmail, "", 0, false, null, 2, true)

    phrases = [
      new Phrase("", "אני רוצה לאכול", "", "", 0, "", false, 0, true),
      new Phrase("", "להכין לך אוכל?", "", "", 0, "", false, 0, true),
      new Phrase("", "סיימתי לאכול", "", "", 0, "", false, 0, true)
    ];

    subCats = [
      new Category("מוצרי חלב", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("מוצרי בשר", "", "", this.userEmail, "", 0, false, null, 1, true),
      new Category("מאכלים כללים", "", "", this.userEmail, "", 0, false, null, 2, true),
      new Category("קינוחים", "", "", this.userEmail, "", 0, false, null, 3, true),
      new Category("משקאות", "", "", this.userEmail, "", 0, false, null, 3, true),
      new Category("ירקות", "", "", this.userEmail, "", 0, false, null, 3, true),
      new Category("פירות", "", "", this.userEmail, "", 0, false, null, 3, true),
      new Category("רטבים ממרחים ותבלינים", "", "", this.userEmail, "", 0, false, null, 3, true)
    ]

    subPhrases = [
      [
        new Phrase("", "גבינה צהובה", "", "", 0, "", false, 0, true),
        new Phrase("", "גבינה בולגרית", "", "", 0, "", false, 0, true),
        new Phrase("", "טוסט גבינה", "", "", 0, "", false, 0, true),
        new Phrase("", "פסטה ברוטב שמנת", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "צלי בשר", "", "", 0, "", false, 0, true),
        new Phrase("", "סטייק אנטריקוט", "", "", 0, "", false, 0, true),
        new Phrase("", "צלעות כבש", "", "", 0, "", false, 0, true),
        new Phrase("", "כבד אווז", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "אורז", "", "", 0, "", false, 0, true),
        new Phrase("", "פסטה", "", "", 0, "", false, 0, true),
        new Phrase("", "מרק", "", "", 0, "", false, 0, true),
        new Phrase("", "פתיתים", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "עוגת שוקולד", "", "", 0, "", false, 0, true),
        new Phrase("", "עוגת ביסקוויטים", "", "", 0, "", false, 0, true),
        new Phrase("", "עוגת לוטוס", "", "", 0, "", false, 0, true),
        new Phrase("", "עוגיות שוקולד צ'יפס", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "קולה", "", "", 0, "", false, 0, true),
        new Phrase("", "מים", "", "", 0, "", false, 0, true),
        new Phrase("", "פיוז טי", "", "", 0, "", false, 0, true),
        new Phrase("", "ספרייט", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "מלפפון", "", "", 0, "", false, 0, true),
        new Phrase("", "עגבניה", "", "", 0, "", false, 0, true),
        new Phrase("", "גזר", "", "", 0, "", false, 0, true),
        new Phrase("", "גמבה", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "תפוח", "", "", 0, "", false, 0, true),
        new Phrase("", "אבטיח", "", "", 0, "", false, 0, true),
        new Phrase("", "מלון", "", "", 0, "", false, 0, true),
        new Phrase("", "בננה", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "קטשופ", "", "", 0, "", false, 0, true),
        new Phrase("", "צ'ילי מתוק", "", "", 0, "", false, 0, true),
        new Phrase("", "ממרח שוקולד", "", "", 0, "", false, 0, true),
        new Phrase("", "מלח ופלפל שחור", "", "", 0, "", false, 0, true)
      ]
    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0, false);

    //FEELINGS CATEGORY
    cat = new Category("רגשות", "", "", this.userEmail, "", 0, false, null, 3, true)

    phrases = [
      new Phrase("", "עצב", "", "", 0, "", false, 0, true),
      new Phrase("", "צחוק", "", "", 0, "", false, 0, true),
      new Phrase("", "עצבנות", "", "", 0, "", false, 0, true),
      new Phrase("", "הפתעה", "", "", 0, "", false, 0, true),
      new Phrase("", "שמחה", "", "", 0, "", false, 0, true),
      new Phrase("", "בהלה", "", "", 0, "", false, 0, true),
      new Phrase("", "אדישות", "", "", 0, "", false, 0, true)
    ];
    this.add_new_cat_to_db(cat, phrases, [], [], 0, false);

    //PERSONAL STUFF CATEGORY
    cat = new Category("חפצים אישיים", "", "", this.userEmail, "", 0, false, null, 4, true)

    phrases = [
      new Phrase("", "פלאפון", "", "", 0, "", false, 0, true),
      new Phrase("", "מפתחות", "", "", 0, "", false, 0, true),
      new Phrase("", "שעון יד", "", "", 0, "", false, 0, true),
      new Phrase("", "משקפיים", "", "", 0, "", false, 0, true),
      new Phrase("", "משקפי שמש", "", "", 0, "", false, 0, true),
      new Phrase("", "ארנק", "", "", 0, "", false, 0, true),
      new Phrase("", "כסף", "", "", 0, "", false, 0, true)
    ];

    this.add_new_cat_to_db(cat, phrases, [], [], 0, false);

    //MEDICINE CATEGORY
    cat = new Category("רפואה", "", "", this.userEmail, "", 0, false, null, 5, true)

    phrases = [
      new Phrase("", "סקלת כאב", "", "", 0, "", false, 0, true),
      new Phrase("", "אני רוצה להזמין תור לרופא", "", "", 0, "", false, 0, true),
      new Phrase("", "אני רוצה לקבל הפנייה למיון", "", "", 0, "", false, 0, true)
    ];

    subCats = [
      new Category("ראש", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("בטן", "", "", this.userEmail, "", 0, false, null, 1, true),
      new Category("אף אוזן גרון", "", "", this.userEmail, "", 0, false, null, 2, true),
      new Category("חזה", "", "", this.userEmail, "", 0, false, null, 3, true),
      new Category("מצב נפשי", "", "", this.userEmail, "", 0, false, null, 3, true),
      new Category("רופאים ואנשי מקצוע", "", " ", this.userEmail, "", 0, false, null, 3, true),
      new Category("בדיקות רפואיות", "", "", this.userEmail, "", 0, false, null, 3, true),
      new Category("סוגי כאב", "", "", this.userEmail, "", 0, false, null, 3, true)
    ]

    subPhrases = [
      [
        new Phrase("", "כאב ראש", "", "", 0, "", false, 0, true),
        new Phrase("", "סחרחורת", "", "", 0, "", false, 0, true),
        new Phrase("", "עייפות", "", "", 0, "", false, 0, true),
        new Phrase("", "חום גבוהה", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "כאב בטן","",  "", 0, "", false, 0, true),
        new Phrase("", "הקאות", "", "", 0, "", false, 0, true),
        new Phrase("", "שלשולים", "", "", 0, "", false, 0, true),
        new Phrase("", "כאבי מחזור", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "צינון", "", "", 0, "", false, 0, true),
        new Phrase("", "כאב גרון", "", "", 0, "", false, 0, true),
        new Phrase("", "כאב אוזניים", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "כאב בחזה", "", "", 0, "", false, 0, true),
        new Phrase("", "צרבת", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "דיכאון", "", "", 0, "", false, 0, true),
        new Phrase("", "בדידות", "", "", 0, "", false, 0, true),
        new Phrase("", "חרדה", "", "", 0, "", false, 0, true),
        new Phrase("", "קשיים בהרדמות", "", "", 0, "", false, 0, true),
        new Phrase("", "מחשבות אובדניות", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "נוירולוג", "", "", 0, "", false, 0, true),
        new Phrase("", "קלינאית תקשורת", "", "", 0, "", false, 0, true),
        new Phrase("", "רופא משפחה", "", "", 0, "", false, 0, true),
        new Phrase("", "כירוג", "", "", 0, "", false, 0, true),
        new Phrase("", "עובדת סוציאלית", "", "", 0, "", false, 0, true),
        new Phrase("", "פיזיותרפיסט", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "בדיקות דם", "", "", 0, "", false, 0, true),
        new Phrase("", "מרשם לתרופות", "", "", 0, "", false, 0, true),
        new Phrase("", "חיסון", "", "", 0, "", false, 0, true),
        new Phrase("", "צילום", "", "", 0, "", false, 0, true)
      ],

      [
        new Phrase("", "מגרד", "", "", 0, "", false, 0, true),
        new Phrase("", "שורף", "", "", 0, "", false, 0, true),
        new Phrase("", "דוקר", "", "", 0, "", false, 0, true)
      ]
    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, 0, true);

    this.categoryProvider.updateCategoriesArray();

  }


}
