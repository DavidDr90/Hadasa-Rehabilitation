import { Injectable } from '@angular/core';
import { Phrase } from '../../models/Phrase'
import { Category } from '../../models/Category'
import { HomePage } from '../../pages/home/home';
import { PhrasesProvider } from '../phrases/phrases';
import { CategoryServiceProvider } from '../category-service/category-service';
import { LoadingController } from 'ionic-angular';
import * as Enums from '../../consts/enums';

/**
 * this provider create the defult categorys and phrases when the app is first load
 */

const DEFAULT_NUMBER = 305;

@Injectable()
export class AppBuilderProvider {
  public userEmail
  public loading;
  public load_counter = 0;
  phraseCounter = 0;

  constructor(public categoryProvider: CategoryServiceProvider, public phraseProvider: PhrasesProvider, public loadingCtrl: LoadingController) {
    this.userEmail = HomePage.userEmail;
  }

  //===================================
  /**This method adds the category& his phrases to the DB.
   * @param category the category to be added to the DB.
   * @param phrases the array of the phrases of this category.
   * @param subCat the array of the sub categories of this category.
   * @param subPhrases the array of the arrays of the phrases each per sub category.
   * @param subFlag true if the category is a sub category and there is need to use "findSubCategoryByID".
   * @returns the ID of the added category in the DB.
   */
  add_new_cat_to_db(category: Category, phrases: Phrase[], subCat: Category[], subPhrases: Phrase[][], subFlag: boolean) {
    let catId: string;
    let promise;
    this.categoryProvider.addCategory(category, true).then(() => {
      if (subFlag)
        promise = this.categoryProvider.getSubCategoryByName(category.parentCategoryID, category.name);
      else
        promise = this.categoryProvider.getCategoryByName(category.name);
      promise.then((data) => {
        catId = data.id;
        for (let i = 0; i < phrases.length; i++) {
          phrases[i].order = i;
          phrases[i].categoryID = catId;

          let pro = this.phraseProvider.addPhrase(phrases[i], true);
          pro.then((data)=>{
            this.phraseCounter++;
            console.log("counter in then = " + this.phraseCounter);
            //TODO: update the DEFAULT_NUMBER before release to client
            //close the loading window after all the phrases was added
            if(this.phraseCounter == DEFAULT_NUMBER){
              this.phraseCounter = 0;
              setTimeout( ()=>{
                this.loading.dismiss();
              }, 3000);
            }
          })
        }
        for (let i = 0; i < subCat.length; i++) {
          subCat[i].order = i;
          subCat[i].parentCategoryID = catId;
          this.add_new_cat_to_db(subCat[i], subPhrases[i], [], [], true)
        }
      })
    })
  }

  //===================================

  /**this method fill the DB for the user with the default categories&phrases
  */
  fillDB() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'רק רגע, אנחנו מייצרים עבורך את המאגר'
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
        new Phrase("", "ראשון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%A8%D7%90%D7%A9%D7%95%D7%9F.mp3?alt=media&token=55c85597-7084-4daf-90a7-f3e343b95a54", false, 0, true),
        new Phrase("", "שני", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%A9%D7%A0%D7%99.mp3?alt=media&token=7dfe1786-0933-4231-9142-c5c550a45aa6", false, 0, true),
        new Phrase("", "שלישי", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%A9%D7%9C%D7%99%D7%A9%D7%99.mp3?alt=media&token=a9be431d-2813-493b-a27b-2f34c9fcc18e", false, 0, true),
        new Phrase("", "רביעי", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%A8%D7%91%D7%99%D7%A2%D7%99.mp3?alt=media&token=4f9ad981-ae91-4a80-9882-a3e4de859716", false, 0, true),
        new Phrase("", "חמישי", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%97%D7%9E%D7%99%D7%A9%D7%99.mp3?alt=media&token=e1d36d86-e85a-48ee-9ae9-d15014d174ad", false, 0, true),
        new Phrase("", "שישי", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%A9%D7%99%D7%A9%D7%99.mp3?alt=media&token=49eef202-a932-43f9-b47c-40e829a43a0a", false, 0, true),
        new Phrase("", "שבת", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%99%D7%95%D7%9D%20%D7%A9%D7%91%D7%AA.mp3?alt=media&token=36b85562-ba44-403d-b9ef-0e55c6d0d389", false, 0, true),
        new Phrase("", "אתמול", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2F%25E2%2580%258F%25E2%2580%258Fprev.PNG?alt=media&token=8bf07686-f0ec-41e3-ab08-6a6fca246ce2", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%90%D7%AA%D7%9E%D7%95%D7%9C.mp3?alt=media&token=93f4a3ae-b03d-494b-b406-263681fe7bd3", false, 0, true),
        new Phrase("", "היום", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%94%D7%99%D7%95%D7%9D.mp3?alt=media&token=d381aa27-eed2-4d9c-a6ce-502720e8034c", false, 0, true),
        new Phrase("", "מחר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fnext.PNG?alt=media&token=c5f2afab-f60f-4a45-adc8-681b490f5d59", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%9E%D7%97%D7%A8.mp3?alt=media&token=101f7451-b391-46a1-825b-dfae6823d28d", false, 0, true),
        new Phrase("", "שבוע שעבר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2F%25E2%2580%258F%25E2%2580%258Fprev.PNG?alt=media&token=8bf07686-f0ec-41e3-ab08-6a6fca246ce2", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%A9%D7%91%D7%95%D7%A2%20%D7%A9%D7%A2%D7%91%D7%A8.mp3?alt=media&token=8e6f32be-f234-4860-9e5f-c60691883296", false, 0, true),
        new Phrase("", "שבוע הבא", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Fnext.PNG?alt=media&token=c5f2afab-f60f-4a45-adc8-681b490f5d59", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%A9%D7%91%D7%95%D7%A2%20%D7%94%D7%91%D7%90.mp3?alt=media&token=5a8a98a3-cc2e-4929-b50a-5d85d00378f6", false, 0, true),
        new Phrase("", "בוקר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%91%D7%95%D7%A7%D7%A8.mp3?alt=media&token=285c2774-5bb7-4ed3-9fbb-89728883cecc", false, 0, true),
        new Phrase("", "צהריים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%A6%D7%94%D7%A8%D7%99%D7%99%D7%9D.mp3?alt=media&token=f4b96a54-a56f-44d1-a4d1-1afa3f447de9", false, 0, true),
        new Phrase("", "ערב", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fdays%2Faudio%2F%D7%A2%D7%A8%D7%91.mp3?alt=media&token=f539edba-324b-4dfb-a6a7-2e1005f2ee6c", false, 0, true),
      ],

      [
        new Phrase("", "תשרי", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%AA%D7%A9%D7%A8%D7%99.mp3?alt=media&token=3c655168-f690-464f-8357-de63c00b108e", false, 0, true),
        new Phrase("", "חשוון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%97%D7%A9%D7%95%D7%95%D7%9F.mp3?alt=media&token=d7a2ab4b-402b-4138-917d-f88a9077bf67", false, 0, true),
        new Phrase("", "כסליו", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%9B%D7%A1%D7%9C%D7%99%D7%95.mp3?alt=media&token=013917cc-b8bd-4a6a-ae1d-cea79acb69d9", false, 0, true),
        new Phrase("", "טבת", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%98%D7%91%D7%AA.mp3?alt=media&token=effb9845-de91-4a24-b71e-daa2d592a966", false, 0, true),
        new Phrase("", "שבט", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%A9%D7%91%D7%98.mp3?alt=media&token=dd5b9404-ab45-4145-b50f-fc21587e6a0f", false, 0, true),
        new Phrase("", "אדר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%90%D7%93%D7%A8.mp3?alt=media&token=1dac9409-ec13-427a-8a71-1e198b087e4c", false, 0, true),
        new Phrase("", "ניסן", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%A0%D7%99%D7%A1%D7%9F.mp3?alt=media&token=766284f5-e12e-414e-96aa-e7a4d1c46a99", false, 0, true),
        new Phrase("", "אייר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%90%D7%99%D7%99%D7%A8.mp3?alt=media&token=12047be4-dfe2-4f7e-8d5e-6f0a2d2bc84c", false, 0, true),
        new Phrase("", "סיוון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%A1%D7%99%D7%95%D7%95%D7%9F.mp3?alt=media&token=fe6dd408-8e86-45fe-9658-f893a85ced3d", false, 0, true),
        new Phrase("", "תמוז", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%AA%D7%9E%D7%95%D7%96.mp3?alt=media&token=19d72f22-ba7e-4bf1-82ac-3a3fc84dd7d5", false, 0, true),
        new Phrase("", "אב", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%90%D7%91.mp3?alt=media&token=eeaaee85-7bb7-46e0-bfd1-5be514f01075", false, 0, true),
        new Phrase("", "אלול", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fhebrew%20months%2Faudio%2F%D7%90%D7%9C%D7%95%D7%9C.mp3?alt=media&token=66675158-51f2-493d-a3db-dde124577649", false, 0, true)
      ],

      [

        new Phrase("", "ינואר - 1", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%99%D7%A0%D7%95%D7%90%D7%A8.mp3?alt=media&token=8d993b7e-10e6-42ce-a6f5-98ef1a0b3bd8", false, 0, true),
        new Phrase("", "פברואר - 2", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%A4%D7%91%D7%A8%D7%95%D7%90%D7%A8.mp3?alt=media&token=dd89d6d1-51c9-44cb-b56b-4d32de429ab6", false, 0, true),
        new Phrase("", "מרץ - 3", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%9E%D7%A8%D7%A5.mp3?alt=media&token=9c14eddd-44d6-45d7-89fc-2f54f282535b", false, 0, true),
        new Phrase("", "אפריל - 4", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%90%D7%A4%D7%A8%D7%99%D7%9C.mp3?alt=media&token=4a8be03a-6901-42b7-be65-5297da8f295a", false, 0, true),
        new Phrase("", "מאי - 5", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%9E%D7%90%D7%99.mp3?alt=media&token=0ad7dcde-3c3f-4c89-b836-5e16303a78bf", false, 0, true),
        new Phrase("", "יוני - 6", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%99%D7%95%D7%A0%D7%99.mp3?alt=media&token=e25ef576-1716-4fcd-ba64-af36641e55cd", false, 0, true),
        new Phrase("", "יולי - 7", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%99%D7%95%D7%9C%D7%99.mp3?alt=media&token=21b6acc5-6717-4bb3-9a70-d7e67d2fe1d0", false, 0, true),
        new Phrase("", "אוגוסט - 8", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%90%D7%95%D7%92%D7%95%D7%A1%D7%98.mp3?alt=media&token=47ca7e4e-14d4-4650-a2cc-8061e934c476", false, 0, true),
        new Phrase("", "ספטמבר - 9", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%A1%D7%A4%D7%98%D7%9E%D7%91%D7%A8.mp3?alt=media&token=88895f88-d3a2-4277-b44b-42f6058b4e86", false, 0, true),
        new Phrase("", "אוקטובר - 10", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%90%D7%95%D7%A7%D7%98%D7%95%D7%91%D7%A8.mp3?alt=media&token=01ac1a0b-fe4b-47b8-8b1e-6f6f7426663f", false, 0, true),
        new Phrase("", "נובמבר - 11", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%A0%D7%95%D7%91%D7%9E%D7%91%D7%A8.mp3?alt=media&token=84e06613-4389-4bf6-9b35-cdd612eb7e9c", false, 0, true),
        new Phrase("", "דצמבר - 12", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Faudio%2F%D7%93%D7%A6%D7%9E%D7%91%D7%A8.mp3?alt=media&token=405fd571-92d5-490d-b90a-b11c56894d41", false, 0, true)
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
        new Phrase("", "שבועות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%A9%D7%91%D7%95%D7%A2%D7%95%D7%AA.mp3?alt=media&token=00eab84e-50a4-4852-bb49-817304e1d6d6", false, 0, true),
        new Phrase("", "תשעה באב", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2F%D7%97%D7%92%D7%99%D7%9D%2Faudio%2F%D7%A9%D7%91%D7%95%D7%A2%D7%95%D7%AA.mp3?alt=media&token=00eab84e-50a4-4852-bb49-817304e1d6d6", false, 0, true)
      ],

      [
        new Phrase("", "יום הולדת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "מסיבה", "", "", 0, "", false, 0, true),
        new Phrase("", "אירוסין", "", "", 0, "", false, 0, true),
        new Phrase("", "חתונה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "יום נישואין", "", "", 0, "", false, 0, true),
        new Phrase("", "גירושין", "", "", 0, "", false, 0, true),
        new Phrase("", "בר מצווה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "בת מצווה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "ברית", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "זבד הבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftime%2Fmonths%2Fimages%2Ftimes.png?alt=media&token=c24ad512-4d51-4dd1-a47c-c3e3f215a844", "", 0, "", false, 0, true),
        new Phrase("", "הלוויה", "", "", 0, "", false, 0, true),
        new Phrase("", "אזכרה", "", "", 0, "", false, 0, true),
        new Phrase("", "שבעה", "", "", 0, "", false, 0, true),
        new Phrase("", "גיוס לצבא", "", "", 0, "", false, 0, true),
        new Phrase("", "טקס סיום", "", "", 0, "", false, 0, true)
      ]
    ];
    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, false);

    //PLACES CATEGORY  
    cat = new Category("מקומות", "", "", this.userEmail, "", 0, false, null, 2, true)
    phrases = [];
    subCats = [
      new Category("בילויים", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("מקומות שאני הולך אליהם", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("חדרים בבית", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("בנק", "", "", this.userEmail, "", 0, false, null, 1, true),
      new Category("קניות", "", "", this.userEmail, "", 0, false, null, 2, true),
      new Category("מסעדות ובתי קפה", "", "", this.userEmail, "", 0, false, null, 3, true)
    ]

    subPhrases = [
      [
        new Phrase("", "קונצרט", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%A7%D7%95%D7%A0%D7%A6%D7%A8%D7%98.mp3?alt=media&token=580fa79b-17df-4501-b503-15286403b0f7", false, 0, true),
        new Phrase("", "מוזיאון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%9E%D7%95%D7%96%D7%99%D7%90%D7%95%D7%9F.mp3?alt=media&token=7f1200fa-118f-416b-a29c-cd02f7a8d50a", false, 0, true),
        new Phrase("", "תיאטרון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%AA%D7%99%D7%90%D7%98%D7%A8%D7%95%D7%9F.mp3?alt=media&token=ea3e9124-63e5-459b-987f-1ce075705c8b", false, 0, true),
        new Phrase("", "הופעה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%94%D7%95%D7%A4%D7%A2%D7%94.mp3?alt=media&token=dabc01a8-2cb2-47f0-a17a-2e00541e1667", false, 0, true),
        new Phrase("", "קןלנוע", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%A7%D7%95%D7%9C%D7%A0%D7%95%D7%A2.mp3?alt=media&token=4b8dd6de-172b-4bb8-b526-234c3fd746f0", false, 0, true),
        new Phrase("", "מסעדה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%9E%D7%A1%D7%A2%D7%93%D7%94.mp3?alt=media&token=a7af46a2-8a29-4b7f-a4f6-7c411037bf5e", false, 0, true),
        new Phrase("", "טיול", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%98%D7%99%D7%95%D7%9C.mp3?alt=media&token=6a907618-3979-459b-a62f-6882358da7ab", false, 0, true),
        new Phrase("", 'חו"ל', "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%97%D7%95%D7%9C.mp3?alt=media&token=e5bb056e-9a5c-4633-9589-528984b38fa9", false, 0, true),
        new Phrase("", "קניות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%A7%D7%A0%D7%99%D7%95%D7%AA.mp3?alt=media&token=16b8e15e-b0de-4063-9cb0-3001d2352c62", false, 0, true),
        new Phrase("", "פיקניק", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%A4%D7%99%D7%A7%D7%A0%D7%99%D7%A7.mp3?alt=media&token=b9e2ea0d-2fd6-4ab5-8702-c3c7ba1cee41", false, 0, true),
        new Phrase("", "פארק", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%A4%D7%90%D7%A8%D7%A7.mp3?alt=media&token=01e85dc0-43ad-49c6-88c3-90b96b11ca8f", false, 0, true),
        new Phrase("", "ים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2F%D7%91%D7%99%D7%9C%D7%95%D7%99%D7%99%D7%9D%2Faudio%2F%D7%99%D7%9D.mp3?alt=media&token=55746758-5e22-403e-992d-240c4fb09218", false, 0, true)
      ],
      [
        new Phrase("", "דואר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%93%D7%95%D7%90%D7%A8.mp3?alt=media&token=9efaecf4-02a9-44f8-a746-18e91e0d5569", false, 0, true),
        new Phrase("", "סופרמרקט", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%A1%D7%95%D7%A4%D7%A8%D7%9E%D7%A8%D7%A7%D7%98.mp3?alt=media&token=d33f2ba1-ce0e-4ddf-984d-b2124b2a2ae2", false, 0, true),
        new Phrase("", "בית חולים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%91%D7%99%D7%AA%20%D7%97%D7%95%D7%9C%D7%99%D7%9D.mp3?alt=media&token=3d808039-f3bf-4731-92ba-d718415390cd", false, 0, true),
        new Phrase("", "קופת חולים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%A7%D7%95%D7%A4%D7%AA%20%D7%97%D7%95%D7%9C%D7%99%D7%9D.mp3?alt=media&token=a294c3c1-b0b0-4bc5-8fe2-3df2cf8c57f3", false, 0, true),
        new Phrase("", "קניון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%A7%D7%A0%D7%99%D7%95%D7%9F.mp3?alt=media&token=f84b9a89-4235-438c-8fc5-ade0542055e5", false, 0, true),
        new Phrase("", "בית כנסת", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%91%D7%99%D7%AA%20%D7%9B%D7%A0%D7%A1%D7%AA.mp3?alt=media&token=a25fb311-3ea0-43e8-a64b-38e18fc027ba", false, 0, true),
        new Phrase("", "חנות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%97%D7%A0%D7%95%D7%AA.mp3?alt=media&token=3cd04258-7564-4cd6-82ba-860e0a794e7f", false, 0, true),
        new Phrase("", "בית מלון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%91%D7%99%D7%AA%20%D7%9E%D7%9C%D7%95%D7%9F.mp3?alt=media&token=9f072739-d1c1-4047-8fed-e119f4d438f3", false, 0, true),
        new Phrase("", "מספרה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%9E%D7%A1%D7%A4%D7%A8%D7%94.mp3?alt=media&token=48faf48b-4b48-4c0d-ad3c-04aa8d1b8002", false, 0, true),
        new Phrase("", "מוסך", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%9E%D7%95%D7%A1%D7%9A.mp3?alt=media&token=4a4f81fc-bf12-4517-8de0-4ff9506423a0", false, 0, true),
        new Phrase("", "חדר כושר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%97%D7%93%D7%A8%20%D7%9B%D7%95%D7%A9%D7%A8.mp3?alt=media&token=44b01dd3-ff01-4a5d-97a9-71f1481f3ef2", false, 0, true),
        new Phrase("", "בריכה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%91%D7%A8%D7%99%D7%9B%D7%94.mp3?alt=media&token=4588c5a9-b51e-430b-a76c-e0d3e43ba7eb", false, 0, true),
        new Phrase("", "בנק", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fplaces%20I%20go%2Faudio%2F%D7%91%D7%A0%D7%A7.mp3?alt=media&token=b4be1fa7-376e-4b97-bb8b-2331e8a0ac32", false, 0, true)
      ],
      [
        new Phrase("", "סלון", "", "", 0, "", false, 0, true),
        new Phrase("", "מטבח", "", "", 0, "", false, 0, true),
        new Phrase("", "שירותים", "", "", 0, "", false, 0, true),
        new Phrase("", "אמבטיה", "", "", 0, "", false, 0, true),
        new Phrase("", "חדר שינה", "", "", 0, "", false, 0, true),
        new Phrase("", "חדר ילדים", "", "", 0, "", false, 0, true),
        new Phrase("", "גינה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Froom%20at%20home%2Faudio%2F%D7%92%D7%99%D7%A0%D7%94.mp3?alt=media&token=79f9a8f2-9e01-4b02-af54-f4f0681bec9e", false, 0, true),
        new Phrase("", "מרפסת", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Froom%20at%20home%2Faudio%2F%D7%9E%D7%A8%D7%A4%D7%A1%D7%AA.mp3?alt=media&token=8d27532c-7fbe-4235-b681-35c05645788f", false, 0, true),
        new Phrase("", "מחסן", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Froom%20at%20home%2Faudio%2F%D7%9E%D7%97%D7%A1%D7%9F.mp3?alt=media&token=d4240582-5752-491c-a6c3-a8ec9a0ba933", false, 0, true)
      ],

      [
        new Phrase("", "היכן הכספומט הקרוב?", "", "", 0, "", false, 0, true),
        new Phrase("", "אני רוצה למשוך כסף מהחשבון", "", "", 0, "", false, 0, true),
        new Phrase("", "אני רוצה להפקיד כסף בחשבון", "", "", 0, "", false, 0, true),
        new Phrase("", "אני רוצה לפתוח חשבון בנק", "", "", 0, "", false, 0, true),
        new Phrase("", "אני רוצה לקבל שירות מבנקאי/ת", "", "", 0, "", false, 0, true),
        new Phrase("", "אני לא זוכר את המספר חשבון שלי", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fbank%2Faudio%2F%D7%90%D7%A0%D7%99%20%D7%9C%D7%90%20%D7%96%D7%95%D7%9B%D7%A8%20%D7%90%D7%AA%20%D7%9E%D7%A1%D7%A4%D7%A8%20%D7%94%D7%97%D7%A9%D7%91%D7%95%D7%9F%20%D7%A9%D7%9C%D7%99.mp3?alt=media&token=b00bd6f9-5d4a-4a29-b60a-7cd2410c1949", false, 0, true)
      ],

      [
        new Phrase("", "אפשר למדוד?", "", "", 0, "", false, 0, true),
        new Phrase("", "היכן תאי המדידה?", "", "", 0, "", false, 0, true),
        new Phrase("", "כמה זה עולה?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fshopping%2Faudio%2F%D7%9B%D7%9E%D7%94%20%D7%96%D7%94%20%D7%A2%D7%95%D7%9C%D7%94.mp3?alt=media&token=9c82f603-e688-4783-9df7-3d6cb85de84b", false, 0, true),
        new Phrase("", "אפשר לשלם?", "", "", 0, "", false, 0, true),
        new Phrase("", "יש מידה אחרת?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fshopping%2Faudio%2F%D7%99%D7%A9%20%D7%9E%D7%99%D7%93%D7%94%20%D7%90%D7%97%D7%A8%D7%AA.mp3?alt=media&token=7ccde529-8c13-4161-8940-e177d3e2ee2e", false, 0, true),
        new Phrase("", "יש בצבע אחר?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fplaces%2Fshopping%2Faudio%2F%D7%99%D7%A9%20%D7%91%D7%A6%D7%91%D7%A2%20%D7%90%D7%97%D7%A8.mp3?alt=media&token=2a0c0eee-fc20-4f3a-b9d4-755005f19ced", false, 0, true)
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

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, false);

    //Travel
    cat = new Category("נסיעות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fdestination.PNG?alt=media&token=1f05a094-877e-4a30-aeb4-0ea685cadc53", this.userEmail, "", 0, false, null, 5, true)

    phrases = [
      new Phrase("", "כיצד מגיעים ליעד?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fdestination.PNG?alt=media&token=1f05a094-877e-4a30-aeb4-0ea685cadc53", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2F%D7%9B%D7%99%D7%A6%D7%93%20%D7%9E%D7%92%D7%99%D7%A2%D7%99%D7%9D%20%D7%9C%D7%99%D7%A2%D7%93%20(1).mp3?alt=media&token=8d7ecba2-2ae6-4488-b8d4-682e39a67529", false, 0, true),
      new Phrase("", "כמה עולה הנסיעה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fcost.PNG?alt=media&token=b4642c22-c838-45f1-8409-4f66ada76da3", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2F%D7%9B%D7%9E%D7%94%20%D7%A2%D7%95%D7%9C%D7%94%20%D7%94%D7%A0%D7%A1%D7%99%D7%A2%D7%94.mp3?alt=media&token=ca91ee5d-d667-4760-a8d4-37e90044771e", false, 0, true),
    ];

    subCats = [
      new Category("רכב פרטי", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("אוטובוס", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fbus.PNG?alt=media&token=1e184ef9-452f-4f5d-a322-761bfbebfdb6", this.userEmail, "", 0, false, null, 1, true),
      new Category("רכבת", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftrain.PNG?alt=media&token=42334b08-0b56-4ca7-9f42-c49bce05f7a5", this.userEmail, "", 0, false, null, 2, true),
      new Category("מונית", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftaxi.PNG?alt=media&token=86c816d9-24b2-49e2-a559-7a4b8c58215a", this.userEmail, "", 0, false, null, 3, true),
    ]

    subPhrases = [
      [
        new Phrase("", "היכן תחנת הדלק הקרובה?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fcar%2F%D7%94%D7%99%D7%9B%D7%9F%20%D7%AA%D7%97%D7%A0%D7%AA%20%D7%94%D7%93%D7%9C%D7%A7%20%D7%94%D7%A7%D7%A8%D7%95%D7%91%D7%94.mp3?alt=media&token=b173e0e2-2014-4ba2-96c3-f1672c7b762b", false, 0, true),
        new Phrase("", "צריך טרמפ?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fcar%2F%D7%A6%D7%A8%D7%99%D7%9A%20%D7%98%D7%A8%D7%9E%D7%A4.mp3?alt=media&token=e986a3ad-ca87-4e91-a5cc-8ae51dcf5876", false, 0, true),
        new Phrase("", "צריכה טרמפ?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fcar%2F%D7%A6%D7%A8%D7%99%D7%9B%D7%94%20%D7%98%D7%A8%D7%9E%D7%A4.mp3?alt=media&token=56688c2a-dd95-49b5-89ea-f811462f1755", false, 0, true),
        new Phrase("", "היכן המוסך הקרוב?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fcar%2F%D7%94%D7%99%D7%9B%D7%9F%20%D7%94%D7%9E%D7%95%D7%A1%D7%9A%20%D7%94%D7%A7%D7%A8%D7%95%D7%91.mp3?alt=media&token=c16906e2-5202-4bac-9eca-22e014344d9d", false, 0, true)
      ],

      [
        new Phrase("", "היכן תחנת האוטובוס?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fbus-station.PNG?alt=media&token=c26b6f69-a184-427b-8e04-a9d369796380", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fbus%2F%D7%94%D7%99%D7%9B%D7%9F%20%D7%AA%D7%97%D7%A0%D7%AA%20%D7%94%D7%90%D7%95%D7%98%D7%95%D7%91%D7%95%D7%A1.mp3?alt=media&token=afc457cd-015e-4832-9d86-3906d882f43e", false, 0, true),
        new Phrase("", "מתי האוטובוס הבא יגיע?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fclock.PNG?alt=media&token=2f3ed60a-5e35-4fd6-ae51-053e0568942b", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fbus%2F%D7%9E%D7%AA%D7%99%20%D7%94%D7%90%D7%95%D7%98%D7%95%D7%91%D7%A1%20%D7%94%D7%91%D7%90%20%D7%99%D7%92%D7%99%D7%A2.mp3?alt=media&token=da3a99b3-2e58-4324-adb7-92b636d4e5df", false, 0, true),
        new Phrase("", "באיזו תחנה לרדת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fbus-station.PNG?alt=media&token=c26b6f69-a184-427b-8e04-a9d369796380", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fbus%2F%D7%91%D7%90%D7%99%D7%96%D7%95%20%D7%AA%D7%97%D7%A0%D7%94%20%D7%9C%D7%A8%D7%93%D7%AA.mp3?alt=media&token=43b22d66-e214-4d87-848d-12496ebb48f9", false, 0, true),
      ],

      [
        new Phrase("", "היכן תחנת הרכבת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftrain.PNG?alt=media&token=42334b08-0b56-4ca7-9f42-c49bce05f7a5", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftrain%2F%D7%94%D7%99%D7%9B%D7%9F%20%D7%AA%D7%97%D7%A0%D7%AA%20%D7%94%D7%A8%D7%9B%D7%91%D7%AA.mp3?alt=media&token=ced9a44a-15e9-457c-aa7a-002fb58ecec1", false, 0, true),
        new Phrase("", "מתי הרכבת הבאה תגיע?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fclock.PNG?alt=media&token=2f3ed60a-5e35-4fd6-ae51-053e0568942b", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftrain%2F%D7%9E%D7%AA%D7%99%20%D7%94%D7%A8%D7%9B%D7%91%D7%AA%20%D7%94%D7%91%D7%90%D7%94%20%D7%AA%D7%92%D7%99%D7%A2.mp3?alt=media&token=39a90661-2f75-4cea-93fe-bcd0420546db", false, 0, true),
        new Phrase("", "באיזו תחנה לרדת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftrain_station.PNG?alt=media&token=7283ec4e-a88a-4055-a4f6-9101104d66fd", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftrain%2F%D7%91%D7%90%D7%99%D7%96%D7%95%25%D7%AA%D7%97%D7%A0%D7%94%25%D7%9C%D7%A8%D7%93%D7%AA.mp3?alt=media&token=e10b67b2-5362-4dd4-8aed-0fe120255e88", false, 0, true)
      ],

      [
        new Phrase("", "אני רוצה להזמין מונית", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftaxi.PNG?alt=media&token=86c816d9-24b2-49e2-a559-7a4b8c58215a", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%9E%D7%95%D7%A0%D7%99%D7%AA.mp3?alt=media&token=fb240efc-9a06-4836-ae2a-bd1b1081d462", false, 0, true),
        new Phrase("", "אתה יכול להפעיל מונה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fcost.PNG?alt=media&token=b4642c22-c838-45f1-8409-4f66ada76da3", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%AA%D7%94%20%D7%99%D7%9B%D7%95%D7%9C%20%D7%9C%D7%94%D7%A4%D7%A2%D7%99%D7%9C%20%D7%9E%D7%95%D7%A0%D7%94.mp3?alt=media&token=9a4e6009-c811-446b-8b7b-9b1d008e074c", false, 0, true),
        new Phrase("", "אצטרך עצירה נוספת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fdestination.PNG?alt=media&token=1f05a094-877e-4a30-aeb4-0ea685cadc53", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%A6%D7%98%D7%A8%D7%9A%20%D7%A2%D7%A6%D7%99%D7%A8%D7%94%20%D7%A0%D7%95%D7%A1%D7%A4%D7%AA.mp3?alt=media&token=17dba32c-f268-46a2-a204-fd6cbc25e810", false, 0, true),
        new Phrase("", "אני צריך להגיע ל....", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fdestination.PNG?alt=media&token=1f05a094-877e-4a30-aeb4-0ea685cadc53", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%9C%D7%94%D7%92%D7%99%D7%A2%20%D7%9C.mp3?alt=media&token=93084297-0f76-4541-8217-81158647698a", false, 0, true), new Phrase("", "", "", "", 0, "", false, 0, true),
        new Phrase("", "כמה אני צריך לשלם?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fcost.PNG?alt=media&token=b4642c22-c838-45f1-8409-4f66ada76da3", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%9B%D7%9E%D7%94%20%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%9C%D7%A9%D7%9C%D7%9D.mp3?alt=media&token=40fb1df9-cc9e-4bbd-9dd2-f7c9dd6a4910", false, 0, true),
        new Phrase("", "אתה מקבל כרטיס אשראי?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fcost.PNG?alt=media&token=b4642c22-c838-45f1-8409-4f66ada76da3", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%AA%D7%94%20%D7%9E%D7%A7%D7%91%D7%9C%20%D7%9B%D7%A8%D7%98%D7%99%D7%A1%20%D7%90%D7%A9%D7%A8%D7%90%D7%99.mp3?alt=media&token=52e750f2-4146-4a32-8b3a-861a414e5aeb", false, 0, true),
      ],
    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, false);


    //FOOD CATEGORY
    cat = new Category("אוכל", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Fimages%2Ffood.PNG?alt=media&token=783e6cf9-688f-4a9c-afc4-4b5daec31023", this.userEmail, "", 0, false, null, 2, true)

    phrases = [
      new Phrase("", "אני רוצה לאכול", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%90%D7%9B%D7%95%D7%9C.mp3?alt=media&token=e3ed315a-4b88-4ba2-a061-b000b969f56c", false, 0, true),
      new Phrase("", "אני לא רעב", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%90%D7%A0%D7%99%20%D7%9C%D7%90%20%D7%A8%D7%A2%D7%91.mp3?alt=media&token=784c2d03-6e64-4003-bc6f-4f1042826db5", false, 0, true),
      new Phrase("", "להכין לך אוכל?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9C%D7%94%D7%9B%D7%99%D7%9F%20%D7%9C%D7%9A%20%D7%90%D7%95%D7%9B%D7%9C.mp3?alt=media&token=73208b35-6602-4b0e-97fd-dfc1d793db55", false, 0, true),
      new Phrase("", "סיימתי לאכול", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A1%D7%99%D7%99%D7%9E%D7%AA%D7%99%20%D7%9C%D7%90%D7%9B%D7%95%D7%9C.mp3?alt=media&token=125872fd-4c32-4a4c-846c-b3aec684764a", false, 0, true),
      new Phrase("", "אולי נצא לאכול בחוץ?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%90%D7%95%D7%9C%D7%99%20%D7%A0%D7%A6%D7%90%20%D7%9C%D7%90%D7%9B%D7%95%D7%9C%20%D7%91%D7%97%D7%95%D7%A5.mp3?alt=media&token=da836ee8-dabc-41e2-b6d4-18102052f81b", false, 0, true),
    ];

    subCats = [
      new Category("ארוחות", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("מוצרי חלב", "", "", this.userEmail, "", 0, false, null, 1, true),
      new Category("מוצרי בשר", "", "", this.userEmail, "", 0, false, null, 2, true),
      new Category("מאכלים כללים", "", "", this.userEmail, "", 0, false, null, 3, true),
      new Category("מאפים", "", "", this.userEmail, "", 0, false, null, 4, true),
      new Category("קינוחים", "", "", this.userEmail, "", 0, false, null, 5, true),
      new Category("משקאות", "", "", this.userEmail, "", 0, false, null, 6, true),
      new Category("ירקות", "", "", this.userEmail, "", 0, false, null, 7, true),
      new Category("פירות", "", "", this.userEmail, "", 0, false, null, 8, true),
      new Category("רטבים, ממרחים ותבלינים", "", "", this.userEmail, "", 0, false, null, 9, true),
    ]

    subPhrases = [
      [//ארוחות
        new Phrase("", "ארוחת בוקר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%90%D7%A8%D7%95%D7%97%D7%95%D7%AA%2F%D7%90%D7%A8%D7%95%D7%97%D7%AA%20%D7%91%D7%95%D7%A7%D7%A8.mp3?alt=media&token=8eba1263-9a1e-4d13-9bf1-8bf6511159d8", false, 0, true),
        new Phrase("", "ארוחת צהרים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%90%D7%A8%D7%95%D7%97%D7%95%D7%AA%2F%D7%90%D7%A8%D7%95%D7%97%D7%AA%20%D7%A6%D7%94%D7%A8%D7%99%D7%9D.mp3?alt=media&token=2f3c9c52-b61b-4220-b5e7-f89fa7a6a2b8", false, 0, true),
        new Phrase("", "ארוחת ערב", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%90%D7%A8%D7%95%D7%97%D7%95%D7%AA%2F%D7%90%D7%A8%D7%95%D7%97%D7%AA%20%D7%A2%D7%A8%D7%91.mp3?alt=media&token=6eeafab1-a68e-4481-85d9-77ba59c58e51", false, 0, true),
        new Phrase("", "שתיה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%90%D7%A8%D7%95%D7%97%D7%95%D7%AA%2F%D7%A9%D7%AA%D7%99%D7%94.mp3?alt=media&token=0f9bd78c-a2ca-40d7-b17e-c1be127344db", false, 0, true),
        new Phrase("", "נשנוש", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%90%D7%A8%D7%95%D7%97%D7%95%D7%AA%2F%D7%A0%D7%A9%D7%A0%D7%95%D7%A9.mp3?alt=media&token=a74a7d2e-3291-4ee8-b905-36a83776efa7", false, 0, true),
      ],

      [//מוצרי חלב
        new Phrase("", "חלב", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91%2F%D7%97%D7%9C%D7%91.mp3?alt=media&token=02cbe1ca-503b-402f-9a31-f3156f8985f2", false, 0, true),
        new Phrase("", "גבינה לבנה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91%2F%D7%92%D7%91%D7%99%D7%A0%D7%94%20%D7%9C%D7%91%D7%A0%D7%94.mp3?alt=media&token=efc5e008-0ba3-4379-b8e7-f31749ccd03d", false, 0, true),
        new Phrase("", "יוגורט", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91%2F%D7%99%D7%95%D7%92%D7%95%D7%A8%D7%98.mp3?alt=media&token=b99d6f8a-6f51-4199-a4dc-ba316e8c7fa9", false, 0, true),
        new Phrase("", "גבינה צהובה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91%2F%D7%92%D7%91%D7%99%D7%A0%D7%94%20%D7%A6%D7%94%D7%95%D7%91%D7%94.mp3?alt=media&token=df1f7ef5-a09c-450d-bd64-9f2d4d75cee7", false, 0, true),
        new Phrase("", "גבינה בולגרית", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91%2F%D7%92%D7%91%D7%99%D7%A0%D7%94%20%D7%91%D7%95%D7%9C%D7%92%D7%A8%D7%99%D7%AA.mp3?alt=media&token=b46347b1-f9c6-4a87-b094-9eb5d6c11cb5", false, 0, true),
        new Phrase("", "קוטג'", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91%2F%D7%A7%D7%95%D7%98%D7%92'.mp3?alt=media&token=c1dbbe70-ccf5-4a40-9b19-f36424132708", false, 0, true),
        new Phrase("", "ביצים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91%2F%D7%91%D7%99%D7%A6%D7%99%D7%9D.mp3?alt=media&token=d3c967c4-e573-48ea-894d-9278a550bc6a", false, 0, true),
        new Phrase("", "חמאה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91%2F%D7%97%D7%9E%D7%90%D7%94.mp3?alt=media&token=ecde95f3-d486-43fd-badc-95979ae252cc", false, 0, true),
        new Phrase("", "מעדן", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%97%D7%9C%D7%91%2F%D7%9E%D7%A2%D7%93%D7%9F.mp3?alt=media&token=c10b0cc0-fe24-4044-91d4-9b96804dfbcb", false, 0, true),
      ],

      [//מוצרי בשר
        new Phrase("", "בשר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%91%D7%A9%D7%A8.mp3?alt=media&token=d83b5880-aba7-47e6-8c4c-5e3b0e9f40f5", false, 0, true),
        new Phrase("", "סטייק אנטריקוט", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%A1%D7%98%D7%99%D7%99%D7%A7%20%D7%90%D7%A0%D7%98%D7%A8%D7%99%D7%A7%D7%95%D7%98.mp3?alt=media&token=0bab3f5c-9b1b-4769-9578-3f4ac8e7ba21", false, 0, true),
        new Phrase("", "קציצות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%A7%D7%A6%D7%99%D7%A6%D7%95%D7%AA.mp3?alt=media&token=914e4f1d-af43-4fd7-a3e2-2f55f222c6f5", false, 0, true),
        new Phrase("", "עוף", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%A2%D7%95%D7%A3.mp3?alt=media&token=bcb8e1cd-05f6-4e19-8661-0fd3b9420900", false, 0, true),
        new Phrase("", "שניצל", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%A9%D7%A0%D7%99%D7%A6%D7%9C.mp3?alt=media&token=8279874d-67eb-47bf-9ada-329ebb9b59f7", false, 0, true),
        new Phrase("", "כדורי בשר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%9B%D7%93%D7%95%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8.mp3?alt=media&token=cc609f6c-03ca-40b3-ab8c-96ec1f29820d", false, 0, true),
        new Phrase("", "חזה עוף", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%97%D7%96%D7%94%20%D7%A2%D7%95%D7%A3.mp3?alt=media&token=5b2f202f-6bb9-4269-945f-42f199f9c6bf", false, 0, true),
        new Phrase("", "שווארמה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%A9%D7%95%D7%95%D7%90%D7%A8%D7%9E%D7%94.mp3?alt=media&token=f3920959-c112-413b-b860-7ed78ea2942f", false, 0, true),
        new Phrase("", "דג", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%93%D7%92.mp3?alt=media&token=01ad8363-e9a0-4d53-85bc-7493486df809", false, 0, true),
        new Phrase("", "טונה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%95%D7%A6%D7%A8%D7%99%20%D7%91%D7%A9%D7%A8%2F%D7%98%D7%95%D7%A0%D7%94.mp3?alt=media&token=4d87b233-6f14-4a57-8ae0-8d7371800a94", false, 0, true),
      ],

      [//מאכלים כללים
        new Phrase("", "אורז", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%90%D7%95%D7%A8%D7%96.mp3?alt=media&token=c61a5057-fe6a-4d6c-b8a1-1bc4034acde1", false, 0, true),
        new Phrase("", "פסטה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A4%D7%A1%D7%98%D7%94.mp3?alt=media&token=c537efc6-8142-45f3-91cc-30bac420f7bb", false, 0, true),
        new Phrase("", "מרק", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%9E%D7%A8%D7%A7.mp3?alt=media&token=c7fb70c3-6fce-4922-8fff-35e03555bd02", false, 0, true),
        new Phrase("", "חביתה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%97%D7%91%D7%99%D7%AA%D7%94.mp3?alt=media&token=6a4df95f-0736-4acd-9946-f76c1a39a120", false, 0, true),
        new Phrase("", "ירקות מבושלים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%99%D7%A8%D7%A7%D7%95%D7%AA%20%D7%9E%D7%91%D7%95%D7%A9%D7%9C%D7%99%D7%9D.mp3?alt=media&token=d63121d4-c0e1-40fd-92ed-18f6bf4e2f48", false, 0, true),
        new Phrase("", "סלט", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A1%D7%9C%D7%98.mp3?alt=media&token=a46c5785-74b8-409d-842d-5d120fe80250", false, 0, true),
        new Phrase("", "פתיתים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A4%D7%AA%D7%99%D7%AA%D7%99%D7%9D.mp3?alt=media&token=deba197b-5647-45d4-9357-2071bc03270b", false, 0, true),
        new Phrase("", "פירה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A4%D7%99%D7%A8%D7%94.mp3?alt=media&token=4df04dab-2a28-40a9-b196-17085402fa4b", false, 0, true),
        new Phrase("", "צ'יפס", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A6'%D7%99%D7%A4%D7%A1.mp3?alt=media&token=1483984c-546d-4cca-9a76-024c4b1088b4", false, 0, true),
        new Phrase("", "פיצה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A4%D7%99%D7%A6%D7%94.mp3?alt=media&token=3eba3612-4ea4-4534-baf2-ed1feedaf566", false, 0, true),
        new Phrase("", "פלאפל", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A4%D7%9C%D7%90%D7%A4%D7%9C.mp3?alt=media&token=c9092657-0fc0-429e-8c8e-2ed82c350349", false, 0, true),
        new Phrase("", "שקשוקה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A9%D7%A7%D7%A9%D7%95%D7%A7%D7%94.mp3?alt=media&token=26a39f07-b96e-4e1a-b9dc-2208df6c275d", false, 0, true),
        new Phrase("", "סושי", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A1%D7%95%D7%A9%D7%99.mp3?alt=media&token=1b02105c-f339-4f23-bb92-23af43cdb2dc", false, 0, true),
        new Phrase("", "קוגל", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%9B%D7%9C%D7%99%D7%9D%20%D7%9B%D7%9C%D7%9C%D7%99%D7%9D%2F%D7%A7%D7%95%D7%92%D7%9C.mp3?alt=media&token=8a4040a1-d1e8-45b8-bb13-9f95a4a78df9", false, 0, true),
      ],

      [//מאפים
        new Phrase("", "לחם", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%A4%D7%99%D7%9D%2F%D7%9C%D7%97%D7%9D.mp3?alt=media&token=b4f2c668-3876-442f-9c29-2498b86c769d", false, 0, true),
        new Phrase("", "לחמניה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%A4%D7%99%D7%9D%2F%D7%9C%D7%97%D7%9E%D7%A0%D7%99%D7%94.mp3?alt=media&token=b3cfe48d-0e0b-4c58-9e40-65a8592e5988", false, 0, true),
        new Phrase("", "פיתה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%A4%D7%99%D7%9D%2F%D7%A4%D7%99%D7%AA%D7%94.mp3?alt=media&token=e283db0f-00ef-46c4-8c12-57f44b3ea521", false, 0, true),
        new Phrase("", "טוסט", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%A4%D7%99%D7%9D%2F%D7%98%D7%95%D7%A1%D7%98.mp3?alt=media&token=5afa3ffb-c956-4132-84bc-dfefc938b977", false, 0, true),
        new Phrase("", "בורקס", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%A4%D7%99%D7%9D%2F%D7%98%D7%95%D7%A1%D7%98.mp3?alt=media&token=5afa3ffb-c956-4132-84bc-dfefc938b977", false, 0, true),
        new Phrase("", "קרואסון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%90%D7%A4%D7%99%D7%9D%2F%D7%A7%D7%A8%D7%95%D7%90%D7%A1%D7%95%D7%9F.mp3?alt=media&token=131abb76-cf6a-47bf-9523-0cbc97fdd5cb", false, 0, true),
      ],

      [//קינוחים
        new Phrase("", "עוגה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A7%D7%99%D7%A0%D7%95%D7%97%D7%99%D7%9D%2F%D7%A2%D7%95%D7%92%D7%94.mp3?alt=media&token=9d020fbc-6b49-4172-a365-c5c4208405c1", false, 0, true),
        new Phrase("", "עוגיות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A7%D7%99%D7%A0%D7%95%D7%97%D7%99%D7%9D%2F%D7%A2%D7%95%D7%92%D7%99%D7%95%D7%AA.mp3?alt=media&token=c5a1f1f2-30b2-4ac4-ae4d-28f3e4bd7558", false, 0, true),
        new Phrase("", "גלידה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A7%D7%99%D7%A0%D7%95%D7%97%D7%99%D7%9D%2F%D7%92%D7%9C%D7%99%D7%93%D7%94.mp3?alt=media&token=f536cd95-04db-45e0-a2a9-02b2650530cb", false, 0, true),
      ],

      [//משקאות
        new Phrase("", "מים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%A9%D7%A7%D7%90%D7%95%D7%AA%2F%D7%9E%D7%99%D7%9D.mp3?alt=media&token=cddbf894-5db8-46de-802f-e202c3ef98e8", false, 0, true),
        new Phrase("", "מיץ", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%A9%D7%A7%D7%90%D7%95%D7%AA%2F%D7%9E%D7%99%D7%A5.mp3?alt=media&token=7d1a6ba2-3fe4-41e5-aef9-7525eedb5b89", false, 0, true),
        new Phrase("", "סודה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%A9%D7%A7%D7%90%D7%95%D7%AA%2F%D7%A1%D7%95%D7%93%D7%94.mp3?alt=media&token=d2bfc6ef-7886-4f22-97d8-ff2ef666d0b1", false, 0, true),
        new Phrase("", "קולה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%A9%D7%A7%D7%90%D7%95%D7%AA%2F%D7%A7%D7%95%D7%9C%D7%94.mp3?alt=media&token=7198b732-6e0c-4ae4-934a-cb3308e96ae8", false, 0, true),
        new Phrase("", "קפה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%A9%D7%A7%D7%90%D7%95%D7%AA%2F%D7%A7%D7%A4%D7%94.mp3?alt=media&token=830fe69c-5450-4ad4-83fb-39d26531c943", false, 0, true),
        new Phrase("", "תה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%A9%D7%A7%D7%90%D7%95%D7%AA%2F%D7%AA%D7%94.mp3?alt=media&token=b998f5b7-78fb-42dc-bdbc-f4c1068a23ec", false, 0, true),
        new Phrase("", "יין", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%A9%D7%A7%D7%90%D7%95%D7%AA%2F%D7%99%D7%99%D7%9F.mp3?alt=media&token=a17485c6-190b-4fcc-ab54-575746791cd9", false, 0, true),
        new Phrase("", "בירה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%9E%D7%A9%D7%A7%D7%90%D7%95%D7%AA%2F%D7%91%D7%99%D7%A8%D7%94.mp3?alt=media&token=e1acbcb1-5794-4d15-b5b3-7892a7628b6d", false, 0, true),
      ],

      [//ירקות
        new Phrase("", "מלפפון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%99%D7%A8%D7%A7%D7%95%D7%AA%2F%D7%9E%D7%9C%D7%A4%D7%A4%D7%95%D7%9F.mp3?alt=media&token=abcdf8ac-3459-49aa-a7a6-90e2808ccdb6", false, 0, true),
        new Phrase("", "עגבניה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%99%D7%A8%D7%A7%D7%95%D7%AA%2F%D7%A2%D7%92%D7%91%D7%A0%D7%99%D7%94.mp3?alt=media&token=bee3602b-c484-40d6-9155-e193144fb336", false, 0, true),
        new Phrase("", "גמבה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%99%D7%A8%D7%A7%D7%95%D7%AA%2F%D7%92%D7%9E%D7%91%D7%94.mp3?alt=media&token=c311d4e1-8688-43e1-874a-1f3895c609a9", false, 0, true),
        new Phrase("", "פלפל", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%99%D7%A8%D7%A7%D7%95%D7%AA%2F%D7%A4%D7%9C%D7%A4%D7%9C.mp3?alt=media&token=5b19d091-1bd8-4097-ae39-b0f4fb130442", false, 0, true),
        new Phrase("", "בצל", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%99%D7%A8%D7%A7%D7%95%D7%AA%2F%D7%91%D7%A6%D7%9C.mp3?alt=media&token=ed894f8d-66b1-4ae4-a205-6312c1084cb7", false, 0, true),
        new Phrase("", "חסה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%99%D7%A8%D7%A7%D7%95%D7%AA%2F%D7%97%D7%A1%D7%94.mp3?alt=media&token=8656e314-cc61-4350-979f-0f102868da8f", false, 0, true),
        new Phrase("", "גזר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%99%D7%A8%D7%A7%D7%95%D7%AA%2F%D7%92%D7%96%D7%A8.mp3?alt=media&token=da8b8201-3191-4bf3-a905-226775490614", false, 0, true),
      ],

      [//פירות
        new Phrase("", "תפוח", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A4%D7%99%D7%A8%D7%95%D7%AA%2F%D7%AA%D7%A4%D7%95%D7%97.mp3?alt=media&token=621a5491-f3c1-4872-9712-27b1f2f6ef29", false, 0, true),
        new Phrase("", "אגס", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A4%D7%99%D7%A8%D7%95%D7%AA%2F%D7%90%D7%92%D7%A1.mp3?alt=media&token=77a4a10b-8c65-45b4-9a80-a11f0fa3b2e3", false, 0, true),
        new Phrase("", "תפוז", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A4%D7%99%D7%A8%D7%95%D7%AA%2F%D7%AA%D7%A4%D7%95%D7%96.mp3?alt=media&token=0f69d6d9-4172-47e7-9897-78f5980c97fc", false, 0, true),
        new Phrase("", "ענבים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A4%D7%99%D7%A8%D7%95%D7%AA%2F%D7%A2%D7%A0%D7%91%D7%99%D7%9D.mp3?alt=media&token=ad263839-8c2a-49e2-977a-15b0f8dbf91a", false, 0, true),
        new Phrase("", "אבטיח", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A4%D7%99%D7%A8%D7%95%D7%AA%2F%D7%90%D7%91%D7%98%D7%99%D7%97.mp3?alt=media&token=f21de5a8-de87-4a74-adf0-e4f83a07170c", false, 0, true),
        new Phrase("", "מלון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A4%D7%99%D7%A8%D7%95%D7%AA%2F%D7%9E%D7%9C%D7%95%D7%9F.mp3?alt=media&token=09a6b91b-bd46-4e0f-9038-66074c41056c", false, 0, true),
        new Phrase("", "בננה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A4%D7%99%D7%A8%D7%95%D7%AA%2F%D7%91%D7%A0%D7%A0%D7%94.mp3?alt=media&token=77d1c70f-58ba-4a2c-a645-cd2dd25f5d1c", false, 0, true),
      ], 
      
      [//רטבים, ממרחים ותבלינים
        new Phrase("", "קטשופ", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%A7%D7%98%D7%A9%D7%95%D7%A4.mp3?alt=media&token=bca80cd2-176f-48be-a893-57306e52fb7b", false, 0, true),
        new Phrase("", "חרדל", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%97%D7%A8%D7%93%D7%9C.mp3?alt=media&token=d7ae8899-84df-471e-8790-50faff0247ea", false, 0, true),
        new Phrase("", "מיונז", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%9E%D7%99%D7%95%D7%A0%D7%96.mp3?alt=media&token=092e54d9-b31f-4d46-9303-d32dc0ed6ecd", false, 0, true),
        new Phrase("", "טחינה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%98%D7%97%D7%99%D7%A0%D7%94.mp3?alt=media&token=1f91a354-ddb6-4ec4-9fc6-158bedbd4105", false, 0, true),
        new Phrase("", "חומוס", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%97%D7%95%D7%9E%D7%95%D7%A1.mp3?alt=media&token=f85a7210-dcdd-45fc-8a1a-4b0de4beffd8", false, 0, true),
        new Phrase("", "צ'ילי מתוק", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%A6'%D7%99%D7%9C%D7%99%20%D7%9E%D7%AA%D7%95%D7%A7.mp3?alt=media&token=2d3759f8-e601-42d0-8eeb-217aca83d074", false, 0, true),
        new Phrase("", "ממרח שוקולד", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%9E%D7%9E%D7%A8%D7%97%20%D7%A9%D7%95%D7%A7%D7%95%D7%9C%D7%93.mp3?alt=media&token=b8371f98-5efe-4014-bdb4-ee48686de65c", false, 0, true),
        new Phrase("", "מלח", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%9E%D7%9C%D7%97.mp3?alt=media&token=41f7b647-a758-4d25-8d70-ee737991c65b", false, 0, true),
        new Phrase("", "פלפל שחור", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%A4%D7%9C%D7%A4%D7%9C%20%D7%A9%D7%97%D7%95%D7%A8.mp3?alt=media&token=75d1221d-31c9-4f7b-94b1-5c6cdb26320c", false, 0, true),
        new Phrase("", "פפריקה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ffood%2Faudio%2F%D7%A8%D7%98%D7%91%D7%99%D7%9D%2C%20%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D%20%D7%95%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D%2F%D7%A4%D7%A4%D7%A8%D7%99%D7%A7%D7%94.mp3?alt=media&token=f30086cc-9892-47d8-8ab4-0d24cb806899", false, 0, true),
      ],
    
    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, false);

    //FEELINGS CATEGORY
    cat = new Category("רגשות", "", "", this.userEmail, "", 0, false, null, 3, true)

    phrases = [
      new Phrase("", "שמחה", "", "", 0, "", false, 0, true),
      new Phrase("", "אהבה", "", "", 0, "", false, 0, true),
      new Phrase("", "רוגע", "", "", 0, "", false, 0, true),
      new Phrase("", "הפתעה", "", "", 0, "", false, 0, true),
      new Phrase("", "גאווה", "", "", 0, "", false, 0, true),
      new Phrase("", "אדישות", "", "", 0, "", false, 0, true),
      new Phrase("", "עצב", "", "", 0, "", false, 0, true),
      new Phrase("", "כעס", "", "", 0, "", false, 0, true),
      new Phrase("", "בלבול", "", "", 0, "", false, 0, true),
      new Phrase("", "קנאה", "", "", 0, "", false, 0, true),
      new Phrase("", "עצבנות", "", "", 0, "", false, 0, true),
      new Phrase("", "דאגה", "", "", 0, "", false, 0, true),
      new Phrase("", "מבוכה", "", "", 0, "", false, 0, true),
      new Phrase("", "אכזבה", "", "", 0, "", false, 0, true),
      new Phrase("", "בהלה", "", "", 0, "", false, 0, true)
    ];
    this.add_new_cat_to_db(cat, phrases, [], [], false)

    //NUMBERS CATEGORY
    cat = new Category("מספרים", "", "", this.userEmail, "", 0, false, null, 3, true)

    phrases = [
      new Phrase("", "אחד", "", "", 0, "", false, 0, true),
      new Phrase("", "שתיים", "", "", 0, "", false, 0, true),
      new Phrase("", "שלוש", "", "", 0, "", false, 0, true),
      new Phrase("", "ארבע", "", "", 0, "", false, 0, true),
      new Phrase("", "חמש", "", "", 0, "", false, 0, true),
      new Phrase("", "שש", "", "", 0, "", false, 0, true),
      new Phrase("", "שבע", "", "", 0, "", false, 0, true),
      new Phrase("", "שמונה", "", "", 0, "", false, 0, true),
      new Phrase("", "תשע", "", "", 0, "", false, 0, true),
      new Phrase("", "עשר", "", "", 0, "", false, 0, true),
      new Phrase("", "עשרים", "", "", 0, "", false, 0, true),
      new Phrase("", "שלושים", "", "", 0, "", false, 0, true),
      new Phrase("", "ארבעים", "", "", 0, "", false, 0, true),
      new Phrase("", "חמישים", "", "", 0, "", false, 0, true),
      new Phrase("", "שישים", "", "", 0, "", false, 0, true),
      new Phrase("", "שבעים", "", "", 0, "", false, 0, true),
      new Phrase("", "שמונים", "", "", 0, "", false, 0, true),
      new Phrase("", "תשעים", "", "", 0, "", false, 0, true),
      new Phrase("", "מאה", "", "", 0, "", false, 0, true),
    ];

    this.add_new_cat_to_db(cat, phrases, [], [], false)

    //PERSONAL STUFF CATEGORY
    cat = new Category("חפצים אישיים", "", "", this.userEmail, "", 0, false, null, 4, true)

    phrases = [
      new Phrase("", "פלאפון", "", "", 0, "", false, 0, true),
      new Phrase("", "מפתחות", "", "", 0, "", false, 0, true),
      new Phrase("", "שעון יד", "", "", 0, "", false, 0, true),
      new Phrase("", "משקפיים", "", "", 0, "", false, 0, true),
      new Phrase("", "משקפי שמש", "", "", 0, "", false, 0, true),
      new Phrase("", "ארנק", "", "", 0, "", false, 0, true),
      new Phrase("", "כסף", "", "", 0, "", false, 0, true),
      new Phrase("", "טישו", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fpersonal%20stuff%2Faudio%2F%D7%98%D7%99%D7%A9%D7%95.mp3?alt=media&token=abf1dc2a-98d3-45e0-a4a0-021d8484b4a2", false, 0, true),
      new Phrase("", "מקל הליכה", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fpersonal%20stuff%2Faudio%2F%D7%9E%D7%A7%D7%9C%20%D7%94%D7%9C%D7%99%D7%9B%D7%94.mp3?alt=media&token=54bbfada-0e4b-44c1-8bf8-dfcbc1672e78", 0, "", false, 0, true),
      new Phrase("", "תרופות", "", "", 0, "", false, 0, true)
    ];

    this.add_new_cat_to_db(cat, phrases, [], [], false);

    //MEDICINE CATEGORY
    cat = new Category("רפואה", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fdoctors%2Fimages%2Fdoctors.PNG?alt=media&token=d5615126-71fd-41e7-8b28-2ad1bc7da7de", this.userEmail, "", 0, false, null, 5, true)

    phrases = [ ];

    subCats = [
      new Category("משפטים", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("סקלת כאב", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("אברי גוף", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("ראש", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("בטן", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("אף אוזן גרון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2FOtolaryngology%2Fimages%2Fotolaryngology.PNG?alt=media&token=fc783d4f-bfa3-400f-81bf-5cf6f8b7ada5", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("חזה", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fchest%2Fimages%2Fchest.PNG?alt=media&token=c3570d3f-524e-415b-a87b-5f555b7ec91f", this.userEmail, "", 0, false, null, 0, true),
      new Category("מצב נפשי", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("רופאים", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fdoctors%2Fimages%2Fdoctors.PNG?alt=media&token=d5615126-71fd-41e7-8b28-2ad1bc7da7de", this.userEmail, "", 0, false, null, 0, true),
      new Category("אנשי מקצוע", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("בדיקות רפואיות", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("סוגי כאב", "", "", this.userEmail, "", 0, false, null, 0, true),




    ]

    subPhrases = [
      [ // משפטים
        new Phrase("", "אני לא מרגיש טוב", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%9D%2F%D7%90%D7%A0%D7%99%20%D7%9C%D7%90%20%D7%9E%D7%A8%D7%92%D7%99%D7%A9%20%D7%98%D7%95%D7%91.mp3?alt=media&token=c53ab6d5-3caa-4e1e-b91b-61ab889aa838", false, 0, true),
        new Phrase("", "כואב לי...", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%9D%2F%D7%9B%D7%95%D7%90%D7%91%20%D7%9C%D7%99.mp3?alt=media&token=855ac031-e389-4e36-9a60-11f8785fdbbb", false, 0, true),
        new Phrase("", "אני רוצה לראות אחות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%9D%2F%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%A8%D7%90%D7%95%D7%AA%20%D7%90%D7%97%D7%95%D7%AA.mp3?alt=media&token=e5739732-e23c-4b5a-8e77-04b185e2ca71", false, 0, true),
        new Phrase("", "אני רוצה להזמין תור לרופא", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%9D%2F%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%AA%D7%95%D7%A8%20%D7%9C%D7%A8%D7%95%D7%A4%D7%90.mp3?alt=media&token=100a0f3b-d780-4bae-a11b-8ccefbe567bf", false, 0, true),
        new Phrase("", "אני רוצה לקבל הפניה למיון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%9D%2F%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%94%D7%A4%D7%A0%D7%99%D7%94%20%D7%9C%D7%9E%D7%99%D7%95%D7%9F.mp3?alt=media&token=e62420e5-9f87-4045-9585-dc6423da5719", false, 0, true),
        new Phrase("", "אני צריך למדוד לחץ דם", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%9D%2F%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%9C%D7%9E%D7%93%D7%95%D7%93%20%D7%9C%D7%97%D7%A5%20%D7%93%D7%9D.mp3?alt=media&token=3286218a-9126-4c11-bc1a-9a5a99d761a4", false, 0, true),
        new Phrase("", "אני צריך בדיקת דם", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%9D%2F%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%91%D7%93%D7%99%D7%A7%D7%AA%20%D7%93%D7%9D.mp3?alt=media&token=8b40668d-7006-45c7-baf1-74674158a34f", false, 0, true),
        new Phrase("", "אני צריך לקבל/לחדש מרשם", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A9%D7%A4%D7%98%D7%99%D7%9D%2F%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%90%D7%95%20%D7%9C%D7%97%D7%93%D7%A9%20%D7%9E%D7%A8%D7%A9%D7%9D.mp3?alt=media&token=9e06f6e7-6596-4a2f-9bc4-a13c0f4c3bf8", false, 0, true)

      ],

      [
        // סקלת כאב
        new Phrase("", "ביטוי לסקלת כאב", "", "", 0, "", false, 0, true)

      ],

      [ // אברי גוף
        new Phrase("", "אצבעות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%90%D7%A6%D7%91%D7%A2%D7%95%D7%AA.mp3?alt=media&token=9855dd26-3f35-406f-bb17-acc87a324846", false, 0, true),
        new Phrase("", "יד", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%99%D7%93.mp3?alt=media&token=f5089854-f9b9-4825-879b-5ad431f72cb9", false, 0, true),
        new Phrase("", "רגל", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%A8%D7%92%D7%9C.mp3?alt=media&token=70041eb4-fb65-456c-ab19-8d2472625387", false, 0, true),
        new Phrase("", "ראש", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%A8%D7%90%D7%A9.mp3?alt=media&token=4b9a23bb-1d01-4605-aca2-f3066ad18c43", false, 0, true),
        new Phrase("", "עיניים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%A2%D7%99%D7%A0%D7%99%D7%99%D7%9D%20.mp3?alt=media&token=bbbc64ba-817b-4dff-b2c7-3d5bf9014d43", false, 0, true),
        new Phrase("", "אוזן", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%90%D7%95%D7%96%D7%9F.mp3?alt=media&token=9fc4d5ec-df8d-43c9-9281-7e700486db08", false, 0, true),
        new Phrase("", "אף", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%90%D7%A3.mp3?alt=media&token=85731fe3-eafc-4b39-b316-36bdcf2c114d", false, 0, true),
        new Phrase("", "שיניים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%A9%D7%99%D7%A0%D7%99%D7%99%D7%9D.mp3?alt=media&token=ac0e5c14-c1da-4256-b420-85d6ae45c35c", false, 0, true),
        new Phrase("", "פה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%A4%D7%94.mp3?alt=media&token=ff0cf821-6aa6-4685-bbdb-1cd5d748159e", false, 0, true),
        new Phrase("", "בטן", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%91%D7%98%D7%9F.mp3?alt=media&token=bf72ac04-21db-4e99-98b2-5b78f4bcc14e", false, 0, true),
        new Phrase("", "גב", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%92%D7%91.mp3?alt=media&token=4e4152f3-2ada-4954-ab71-65d139f44590", false, 0, true),
        new Phrase("", "לב", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%9C%D7%91.mp3?alt=media&token=ab558135-3572-4dc6-9bc3-b67a679119fe", false, 0, true),
        new Phrase("", "חזה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%97%D7%96%D7%94.mp3?alt=media&token=f14d1553-7630-4bb7-9a4e-78c1073382fb", false, 0, true),
        new Phrase("", "איבר מין", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%90%D7%99%D7%91%D7%A8%20%D7%9E%D7%99%D7%9F.mp3?alt=media&token=6f1c19b7-28bb-4fa5-a2a5-dde66f336b54", false, 0, true),
        new Phrase("", "ישבן", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%99%D7%91%D7%A8%D7%99%20%D7%92%D7%95%D7%A3%2F%D7%99%D7%A9%D7%91%D7%9F.mp3?alt=media&token=3362ff09-e621-4eac-bfa7-98c15981fe01", false, 0, true)
      ],

      [// ראש
        new Phrase("", "כאב ראש", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fhead%2Fimages%2Fheadache.PNG?alt=media&token=d588a013-cc13-4e62-a792-ed5c32b53aff", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%90%D7%A9%2F%D7%9B%D7%90%D7%91%20%D7%A8%D7%90%D7%A9.mp3?alt=media&token=b4c9d1be-8829-4028-8d8b-232f3c0b4ffa", false, 0, true),
        new Phrase("", "סחרחורת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fhead%2Fimages%2Fdizziness.PNG?alt=media&token=0605400e-030c-40bd-8a8b-a05c0c07267c", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%90%D7%A9%2F%D7%A1%D7%97%D7%A8%D7%97%D7%95%D7%A8%D7%AA.mp3?alt=media&token=eb590725-a8ac-4ec5-8452-1e7d06da3890", false, 0, true),
        new Phrase("", "עייפות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fhead%2Fimages%2F%25E2%2580%258F%25E2%2580%258Fsleepy.PNG?alt=media&token=2efec807-3efa-4013-9a6d-26fea7025bee", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%90%D7%A9%2F%D7%A2%D7%99%D7%99%D7%A4%D7%95%D7%AA.mp3?alt=media&token=6ea45d5b-aad6-4c55-96c7-95f060ccac46", false, 0, true),
        new Phrase("", "חום", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fhead%2Fimages%2F%25E2%2580%258F%25E2%2580%258Fmedical_thermometer.PNG?alt=media&token=09ae617d-48b1-4a97-bdb8-43f30c8635b5", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%90%D7%A9%2F%D7%97%D7%95%D7%9D%20.mp3?alt=media&token=772f8b98-726a-4fb4-b2af-dd95f6d8678e", false, 0, true),
        new Phrase("", "ראיה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%90%D7%A9%2F%D7%A8%D7%90%D7%99%D7%94.mp3?alt=media&token=c2243516-aebc-4405-a54c-0fe23ecddb6b", false, 0, true),
        new Phrase("", "שמיעה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%90%D7%A9%2F%D7%A9%D7%9E%D7%99%D7%A2%D7%94.mp3?alt=media&token=e0ba8e91-0c1a-4def-8d8a-890f7f61db77", false, 0, true),
        new Phrase("", "עילפון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%90%D7%A9%2F%D7%A2%D7%99%D7%9C%D7%A4%D7%95%D7%9F.mp3?alt=media&token=60f307f3-ce6c-4d72-88ed-5c0f5fda4778", false, 0, true),
        new Phrase("", "שיווי משקל", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%90%D7%A9%2F%D7%A9%D7%99%D7%95%D7%95%D7%99%20%D7%9E%D7%A9%D7%A7%D7%9C.mp3?alt=media&token=6a99ae29-0ca5-4da4-89a4-aeb33a58ce6a", false, 0, true)
      ],

      [ // בטן
        new Phrase("", "כאב בטן", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fstomach%2Fimages%2Fstomach.PNG?alt=media&token=6ce2014d-f8af-4ec2-9ee4-b28bd7aeac3b", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%98%D7%9F%2F%D7%9B%D7%90%D7%91%20%D7%91%D7%98%D7%9F.mp3?alt=media&token=4f88310d-a3fd-46e3-9905-f8a0a7d893ae", false, 0, true),
        new Phrase("", "הקאות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fstomach%2Fimages%2Fvomit.PNG?alt=media&token=dbc535a1-9c84-4645-b508-a97b3a269ea6", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%98%D7%9F%2F%D7%94%D7%A7%D7%90%D7%95%D7%AA.mp3?alt=media&token=5e4cd002-c61a-4976-a955-973da3cd9cc9", false, 0, true),
        new Phrase("", "עצירות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%98%D7%9F%2F%D7%A2%D7%A6%D7%99%D7%A8%D7%95%D7%AA.mp3?alt=media&token=5b20c1c0-eece-4778-b6ef-ec58b6297491", false, 0, true),
        new Phrase("", "שלשולים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%98%D7%9F%2F%D7%A9%D7%9C%D7%A9%D7%95%D7%9C%D7%99%D7%9D.mp3?alt=media&token=f40099af-2274-4e0f-9ab5-8df872424b59", false, 0, true),
        new Phrase("", "כאבי מחזור", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%98%D7%9F%2F%D7%9B%D7%90%D7%91%D7%99%20%D7%9E%D7%97%D7%96%D7%95%D7%A8.mp3?alt=media&token=ce34e4ce-74e3-4010-91bf-9f12dbb46149", false, 0, true),
        new Phrase("", "שתן", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%98%D7%9F%2F%D7%A9%D7%AA%D7%9F.mp3?alt=media&token=293d884a-f45b-4636-928a-0231573d1669", false, 0, true),
        new Phrase("", "טחורים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%98%D7%9F%2F%D7%98%D7%97%D7%95%D7%A8%D7%99%D7%9D.mp3?alt=media&token=99e33fd6-3468-45fa-9d70-13355e4895d0", false, 0, true),
        new Phrase("", "אחר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%98%D7%9F%2F%D7%90%D7%97%D7%A8.mp3?alt=media&token=fe8af62e-bd94-40cb-a651-ad92c20cb73f", false, 0, true)

      ],

      [ // אף אוזן גרון
        new Phrase("", "כאב אוזניים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2FOtolaryngology%2Fimages%2Fear_pain.PNG?alt=media&token=0c60224b-ac73-4978-af14-c07aa080124c", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A3%20%D7%90%D7%95%D7%96%D7%9F%20%D7%92%D7%A8%D7%95%D7%9F%2F%D7%9B%D7%90%D7%91%20%D7%90%D7%95%D7%96%D7%A0%D7%99%D7%99%D7%9D.mp3?alt=media&token=08c4c68e-8377-4a5a-87ee-7d766589b3aa", false, 0, true),
        new Phrase("", "כאב גרון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2FOtolaryngology%2Fimages%2Fsore_throat.PNG?alt=media&token=a7a94613-53bd-4a53-b4ae-4e9bd8fb16a2", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A3%20%D7%90%D7%95%D7%96%D7%9F%20%D7%92%D7%A8%D7%95%D7%9F%2F%D7%9B%D7%90%D7%91%20%D7%92%D7%A8%D7%95%D7%9F.mp3?alt=media&token=bc987bdf-f03d-48e9-8b34-779d64252f14", false, 0, true),
        new Phrase("", "צינון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2FOtolaryngology%2Fimages%2Fnose%20pain.PNG?alt=media&token=e5b44151-2e62-47b9-a06e-e894a5803e0b", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A3%20%D7%90%D7%95%D7%96%D7%9F%20%D7%92%D7%A8%D7%95%D7%9F%2F%D7%A6%D7%99%D7%A0%D7%95%D7%9F.mp3?alt=media&token=8b4b6757-8df5-4acd-a135-7b31e0897520", false, 0, true),
        new Phrase("", "שיעול", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A3%20%D7%90%D7%95%D7%96%D7%9F%20%D7%92%D7%A8%D7%95%D7%9F%2F%D7%A9%D7%99%D7%A2%D7%95%D7%9C.mp3?alt=media&token=a23734c2-a9bc-4c41-a4cd-8f10c8d563e0", false, 0, true),
        new Phrase("", "צרידות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A3%20%D7%90%D7%95%D7%96%D7%9F%20%D7%92%D7%A8%D7%95%D7%9F%2F%D7%A6%D7%A8%D7%99%D7%93%D7%95%D7%AA.mp3?alt=media&token=9bd316f6-3ef3-4e21-bdf1-299e3042237c", false, 0, true),
        new Phrase("", "קושי בבליעה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2FOtolaryngology%2Fimages%2Fsore_throat.PNG?alt=media&token=a7a94613-53bd-4a53-b4ae-4e9bd8fb16a2", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A3%20%D7%90%D7%95%D7%96%D7%9F%20%D7%92%D7%A8%D7%95%D7%9F%2F%D7%A7%D7%95%D7%A9%D7%99%20%D7%91%D7%91%D7%9C%D7%99%D7%A2%D7%94.mp3?alt=media&token=7b71dcf0-cff6-418c-a063-744495ae36cd", false, 0, true),
        new Phrase("", "אחר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A3%20%D7%90%D7%95%D7%96%D7%9F%20%D7%92%D7%A8%D7%95%D7%9F%2F%D7%90%D7%97%D7%A8.mp3?alt=media&token=e85e3dd4-47e4-4bb5-966a-8bb480fa11c8", false, 0, true)
      ],

      [ // חזה
        new Phrase("", "בחילות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%97%D7%96%D7%94%2F%D7%91%D7%97%D7%99%D7%9C%D7%95%D7%AA.mp3?alt=media&token=e0c698f2-0149-4904-9aaf-56ba366ae2f5", false, 0, true),
        new Phrase("", "צרבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fchest%2Fimages%2Fheartburn.PNG?alt=media&token=ad70adf3-2fa4-4cbb-b07d-453bbed8d0c2", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%97%D7%96%D7%94%2F%D7%A6%D7%A8%D7%91%D7%AA.mp3?alt=media&token=6832021c-418b-4118-8b25-0dcdf9b097db", false, 0, true),
        new Phrase("", "כאב בחזה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fchest%2Fimages%2Fchest.PNG?alt=media&token=c3570d3f-524e-415b-a87b-5f555b7ec91f", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%97%D7%96%D7%94%2F%D7%9B%D7%90%D7%91%20%D7%91%D7%97%D7%96%D7%94.mp3?alt=media&token=49471db0-cbf2-4451-a62f-9101da651e1c", false, 0, true),
        new Phrase("", "אחר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%97%D7%96%D7%94%2F%D7%90%D7%97%D7%A8.mp3?alt=media&token=c9a1f6b5-49ac-41be-8925-39d81652a3a4", false, 0, true)
      ],

      [ // מצב נפשי
        new Phrase("", "דיכאון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A6%D7%91%20%D7%A0%D7%A4%D7%A9%D7%99%2F%D7%93%D7%99%D7%9B%D7%90%D7%95%D7%9F.mp3?alt=media&token=57268e01-5f2e-4c49-b15a-e22e182aa68f", false, 0, true),
        new Phrase("", "חרדה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A6%D7%91%20%D7%A0%D7%A4%D7%A9%D7%99%2F%D7%97%D7%A8%D7%93%D7%94.mp3?alt=media&token=f8a2ea7e-c8de-4eba-bca1-5bdfedd79ebc", false, 0, true),
        new Phrase("", "בדידות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A6%D7%91%20%D7%A0%D7%A4%D7%A9%D7%99%2F%D7%91%D7%93%D7%99%D7%93%D7%95%D7%AA.mp3?alt=media&token=ade344bf-85fc-4707-a7b0-fcc5b3e675cb", false, 0, true),
        new Phrase("", "קשיים בזוגיות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A6%D7%91%20%D7%A0%D7%A4%D7%A9%D7%99%2F%D7%A7%D7%A9%D7%99%D7%99%D7%9D%20%D7%91%D7%96%D7%95%D7%92%D7%99%D7%95%D7%AA.mp3?alt=media&token=b227bb09-6895-4c23-94a5-65ecbb43af33", false, 0, true),
        new Phrase("", "קושי בהירדמות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A6%D7%91%20%D7%A0%D7%A4%D7%A9%D7%99%2F%D7%A7%D7%95%D7%A9%D7%99%20%D7%91%D7%94%D7%99%D7%A8%D7%93%D7%9E%D7%95%D7%AA.mp3?alt=media&token=01cf7e2a-a78a-4fe9-8d49-d301504cc17a", false, 0, true),
        new Phrase("", "מחשבות אובדניות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A6%D7%91%20%D7%A0%D7%A4%D7%A9%D7%99%2F%D7%9E%D7%97%D7%A9%D7%91%D7%95%D7%AA%20%D7%90%D7%95%D7%91%D7%93%D7%A0%D7%99%D7%95%D7%AA.mp3?alt=media&token=c3a60e30-0f71-4dda-984a-c16d0a82b931", false, 0, true),
        new Phrase("", "אחר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%9E%D7%A6%D7%91%20%D7%A0%D7%A4%D7%A9%D7%99%2F%D7%90%D7%97%D7%A8.mp3?alt=media&token=a45c2cb6-38d0-420c-af37-d87a59e741a4", false, 0, true)
      ],

      [ // רופאים
        new Phrase("", "רופא משפחה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%95%D7%A4%D7%90%D7%99%D7%9D%2F%D7%A8%D7%95%D7%A4%D7%90%20%D7%9E%D7%A9%D7%A4%D7%97%D7%94.mp3?alt=media&token=b874921f-cb12-47a5-aada-543f51e2ec13", false, 0, true),
        new Phrase("", "נוירולוג", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%95%D7%A4%D7%90%D7%99%D7%9D%2F%D7%A0%D7%95%D7%99%D7%A8%D7%95%D7%9C%D7%95%D7%92.mp3?alt=media&token=c5589221-c7cf-4a3f-a1d1-20a0b25b6d60", false, 0, true),
        new Phrase("", "קרדיולוג", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%95%D7%A4%D7%90%D7%99%D7%9D%2F%D7%A7%D7%A8%D7%93%D7%99%D7%95%D7%9C%D7%95%D7%92.mp3?alt=media&token=4850d5ce-5120-4fe3-8476-2b128df1fea9", false, 0, true),
        new Phrase("", "אף אוזן גרון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%95%D7%A4%D7%90%D7%99%D7%9D%2F%D7%90%D7%A3%20%D7%90%D7%95%D7%96%D7%9F%20%D7%92%D7%A8%D7%95%D7%9F.mp3?alt=media&token=d36ee650-ab4e-4df3-8469-e94e9e4616c7", false, 0, true),
        new Phrase("", "אורתופד", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%95%D7%A4%D7%90%D7%99%D7%9D%2F%D7%90%D7%95%D7%A8%D7%AA%D7%95%D7%A4%D7%93.mp3?alt=media&token=6105c52f-1d1d-49e1-b247-cca562296576", false, 0, true),
        new Phrase("", "רופא עיניים", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%95%D7%A4%D7%90%D7%99%D7%9D%2F%D7%A8%D7%95%D7%A4%D7%90%20%D7%A2%D7%99%D7%A0%D7%99%D7%99%D7%9D.mp3?alt=media&token=d682c09a-2ead-47da-84a8-a7717936bbaa", false, 0, true),
        new Phrase("", "רופא עור", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%95%D7%A4%D7%90%D7%99%D7%9D%2F%D7%A8%D7%95%D7%A4%D7%90%20%D7%A2%D7%95%D7%A8.mp3?alt=media&token=683f1e48-48e2-4989-8a5b-98abe83be167", false, 0, true),
        new Phrase("", "אחר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A8%D7%95%D7%A4%D7%90%D7%99%D7%9D%2F%D7%90%D7%97%D7%A8.mp3?alt=media&token=c4302018-3dc4-46ad-930b-89cfe6912f76", false, 0, true)

      ],

      [ // אנשי מקצוע
        new Phrase("", "קלינאי/ת תקשורת", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A0%D7%A9%D7%99%20%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%2F%D7%A7%D7%9C%D7%99%D7%A0%D7%90%D7%99%D7%AA%20%D7%AA%D7%A7%D7%A9%D7%95%D7%A8%D7%AA.mp3?alt=media&token=0f8ad72a-8df1-40a9-9350-7bb89c426b52", false, 0, true),
        new Phrase("", "פיזיותרפיה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A0%D7%A9%D7%99%20%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%2F%D7%A4%D7%99%D7%96%D7%99%D7%95%D7%AA%D7%A8%D7%A4%D7%99%D7%94.mp3?alt=media&token=fa34bb46-8848-4c07-bbd2-0d2887eeb303", false, 0, true),
        new Phrase("", "ריפוי בעיסוק", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A0%D7%A9%D7%99%20%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%2F%D7%A8%D7%99%D7%A4%D7%95%D7%99%20%D7%91%D7%A2%D7%99%D7%A1%D7%95%D7%A7.mp3?alt=media&token=7e7bc9d0-aea7-452a-9642-52c45318851d", false, 0, true),
        new Phrase("", "עובדת סוציאלית", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A0%D7%A9%D7%99%20%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%2F%D7%A2%D7%95%D7%91%D7%93%D7%AA%20%D7%A1%D7%95%D7%A6%D7%99%D7%90%D7%9C%D7%99%D7%AA.mp3?alt=media&token=74300909-9373-4fd9-a136-8e7b74385c66", false, 0, true),
        new Phrase("", "פסיכולוג", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A0%D7%A9%D7%99%20%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%2F%D7%A4%D7%99%D7%A1%D7%9B%D7%95%D7%9C%D7%95%D7%92.mp3?alt=media&token=a7f9c6ec-ee4d-447b-ad06-15c17bc52391", false, 0, true),
        new Phrase("", "דיאטנית", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A0%D7%A9%D7%99%20%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%2F%D7%93%D7%99%D7%90%D7%98%D7%A0%D7%99%D7%AA.mp3?alt=media&token=6292bc78-ffe9-41fb-86b8-3ee561684c9a", false, 0, true),
        new Phrase("", "אחר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%90%D7%A0%D7%A9%D7%99%20%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%2F%D7%90%D7%97%D7%A8.mp3?alt=media&token=cf621fac-9dad-46f7-895c-109e33b1c009", false, 0, true)
      ],

      [ // בדיקות רפואיות
        new Phrase("", "מרשם לתרופות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%20%D7%A8%D7%A4%D7%95%D7%90%D7%99%D7%95%D7%AA%2F%D7%9E%D7%A8%D7%A9%D7%9D%20%D7%9C%D7%AA%D7%A8%D7%95%D7%A4%D7%95%D7%AA%20.mp3?alt=media&token=a1aaaf53-d7e7-4121-ac6a-56abf5bf4efa", false, 0, true),
        new Phrase("", "בדיקות דם", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%20%D7%A8%D7%A4%D7%95%D7%90%D7%99%D7%95%D7%AA%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%20%D7%93%D7%9D.mp3?alt=media&token=10de1b00-4bd6-4823-af4c-d4a4b8072536", false, 0, true),
        new Phrase("", "חיסון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%20%D7%A8%D7%A4%D7%95%D7%90%D7%99%D7%95%D7%AA%2F%D7%97%D7%99%D7%A1%D7%95%D7%9F.mp3?alt=media&token=8983d119-1044-4694-beb4-344c8edfec07", false, 0, true),
        new Phrase("", "צילום", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%20%D7%A8%D7%A4%D7%95%D7%90%D7%99%D7%95%D7%AA%2F%D7%A6%D7%99%D7%9C%D7%95%D7%9D.mp3?alt=media&token=e155a1b4-fcc4-465d-b57a-f6b06e5f5645", false, 0, true),
        new Phrase("", "הפניה למומחה", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%20%D7%A8%D7%A4%D7%95%D7%90%D7%99%D7%95%D7%AA%2F%D7%94%D7%A4%D7%A0%D7%99%D7%94%20%D7%9C%D7%9E%D7%95%D7%9E%D7%97%D7%94.mp3?alt=media&token=fe43a498-c465-4a46-bc31-509248628a26", false, 0, true),
        new Phrase("", "התחייבות", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%20%D7%A8%D7%A4%D7%95%D7%90%D7%99%D7%95%D7%AA%2F%D7%94%D7%AA%D7%97%D7%99%D7%99%D7%91%D7%95%D7%AA.mp3?alt=media&token=e4573521-e13f-4f7f-8f2e-436944b316ec", false, 0, true),
        new Phrase("", "הפניה למיון", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%20%D7%A8%D7%A4%D7%95%D7%90%D7%99%D7%95%D7%AA%2F%D7%94%D7%A4%D7%A0%D7%99%D7%94%20%D7%9C%D7%9E%D7%99%D7%95%D7%9F.mp3?alt=media&token=4f5c7bd2-37dc-4469-8424-f2d3f31e1952", false, 0, true),
        new Phrase("", "אחר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%20%D7%A8%D7%A4%D7%95%D7%90%D7%99%D7%95%D7%AA%2F%D7%90%D7%97%D7%A8.mp3?alt=media&token=a68c76f9-5d95-4bff-82f7-f34a5174f8b7", false, 0, true)
      ],

      [ // סוגי כאב
        new Phrase("", "מגרד", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fpain%2Fimages%2Fitchy.PNG?alt=media&token=6a522255-9f38-4f59-a607-8e2a78ffd5b3", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A1%D7%95%D7%92%D7%99%20%D7%9B%D7%90%D7%91%2F%D7%9E%D7%92%D7%A8%D7%93.mp3?alt=media&token=cc4ac533-48ad-4b6b-bbb1-311fa7bbb274", false, 0, true),
        new Phrase("", "שורף", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fpain%2Fimages%2Fburning_pain.PNG?alt=media&token=83f94433-3d41-466c-8601-29c9dc39c34b", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A1%D7%95%D7%92%D7%99%20%D7%9B%D7%90%D7%91%2F%D7%A9%D7%95%D7%A8%D7%A3.mp3?alt=media&token=fbbfba13-daba-4013-9867-bcb47c4e1489", false, 0, true),
        new Phrase("", "פועם", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A1%D7%95%D7%92%D7%99%20%D7%9B%D7%90%D7%91%2F%D7%A4%D7%95%D7%A2%D7%9D.mp3?alt=media&token=4e1c4737-e163-40aa-aac4-4a707e6afc14", false, 0, true),
        new Phrase("", "דוקר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Fpain%2Fimages%2Fstabbing_pain.PNG?alt=media&token=f1d5777e-d031-4d3b-ae99-5d364139eab9", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A1%D7%95%D7%92%D7%99%20%D7%9B%D7%90%D7%91%2F%D7%93%D7%95%D7%A7%D7%A8.mp3?alt=media&token=ead5a7de-b5e5-4ffa-807d-091ee3a8b748", false, 0, true),
        new Phrase("", "אחר", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Fmadical%2Faudio%2F%D7%A1%D7%95%D7%92%D7%99%20%D7%9B%D7%90%D7%91%2F%D7%90%D7%97%D7%A8.mp3?alt=media&token=2de44444-e03b-4c3d-ac18-e3ccfca9d615", false, 0, true)
      ]
    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, false);


        //Travel
    cat = new Category("נסיעות", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fdestination.PNG?alt=media&token=1f05a094-877e-4a30-aeb4-0ea685cadc53", this.userEmail, "", 0, false, null, 5, true)

    phrases = [
      new Phrase("", "כיצד מגיעים ליעד?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fdestination.PNG?alt=media&token=1f05a094-877e-4a30-aeb4-0ea685cadc53", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2F%D7%9B%D7%99%D7%A6%D7%93%20%D7%9E%D7%92%D7%99%D7%A2%D7%99%D7%9D%20%D7%9C%D7%99%D7%A2%D7%93%20(1).mp3?alt=media&token=8d7ecba2-2ae6-4488-b8d4-682e39a67529", false, 0, true),
      new Phrase("", "כמה עולה הנסיעה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fcost.PNG?alt=media&token=b4642c22-c838-45f1-8409-4f66ada76da3", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2F%D7%9B%D7%9E%D7%94%20%D7%A2%D7%95%D7%9C%D7%94%20%D7%94%D7%A0%D7%A1%D7%99%D7%A2%D7%94.mp3?alt=media&token=ca91ee5d-d667-4760-a8d4-37e90044771e", false, 0, true),
    ];

    subCats = [
      new Category("רכב פרטי", "", "", this.userEmail, "", 0, false, null, 0, true),
      new Category("אוטובוס", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fbus.PNG?alt=media&token=1e184ef9-452f-4f5d-a322-761bfbebfdb6", this.userEmail, "", 0, false, null, 1, true),
      new Category("רכבת", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftrain.PNG?alt=media&token=42334b08-0b56-4ca7-9f42-c49bce05f7a5", this.userEmail, "", 0, false, null, 2, true),
      new Category("מונית", "", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftaxi.PNG?alt=media&token=86c816d9-24b2-49e2-a559-7a4b8c58215a", this.userEmail, "", 0, false, null, 3, true),
    ]

    subPhrases = [
      [
        new Phrase("", "היכן תחנת הדלק הקרובה?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fcar%2F%D7%94%D7%99%D7%9B%D7%9F%20%D7%AA%D7%97%D7%A0%D7%AA%20%D7%94%D7%93%D7%9C%D7%A7%20%D7%94%D7%A7%D7%A8%D7%95%D7%91%D7%94.mp3?alt=media&token=b173e0e2-2014-4ba2-96c3-f1672c7b762b", false, 0, true),
        new Phrase("", "צריך טרמפ?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fcar%2F%D7%A6%D7%A8%D7%99%D7%9A%20%D7%98%D7%A8%D7%9E%D7%A4.mp3?alt=media&token=e986a3ad-ca87-4e91-a5cc-8ae51dcf5876", false, 0, true),
        new Phrase("", "צריכה טרמפ?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fcar%2F%D7%A6%D7%A8%D7%99%D7%9B%D7%94%20%D7%98%D7%A8%D7%9E%D7%A4.mp3?alt=media&token=56688c2a-dd95-49b5-89ea-f811462f1755", false, 0, true),
        new Phrase("", "היכן המוסך הקרוב?", "", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fcar%2F%D7%94%D7%99%D7%9B%D7%9F%20%D7%94%D7%9E%D7%95%D7%A1%D7%9A%20%D7%94%D7%A7%D7%A8%D7%95%D7%91.mp3?alt=media&token=c16906e2-5202-4bac-9eca-22e014344d9d", false, 0, true)
      ],

      [
        new Phrase("", "היכן תחנת האוטובוס?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fbus-station.PNG?alt=media&token=c26b6f69-a184-427b-8e04-a9d369796380", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fbus%2F%D7%94%D7%99%D7%9B%D7%9F%20%D7%AA%D7%97%D7%A0%D7%AA%20%D7%94%D7%90%D7%95%D7%98%D7%95%D7%91%D7%95%D7%A1.mp3?alt=media&token=afc457cd-015e-4832-9d86-3906d882f43e", false, 0, true),
        new Phrase("", "מתי האוטובוס הבא יגיע?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fclock.PNG?alt=media&token=2f3ed60a-5e35-4fd6-ae51-053e0568942b", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fbus%2F%D7%9E%D7%AA%D7%99%20%D7%94%D7%90%D7%95%D7%98%D7%95%D7%91%D7%A1%20%D7%94%D7%91%D7%90%20%D7%99%D7%92%D7%99%D7%A2.mp3?alt=media&token=da3a99b3-2e58-4324-adb7-92b636d4e5df", false, 0, true),
        new Phrase("", "באיזו תחנה לרדת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fbus-station.PNG?alt=media&token=c26b6f69-a184-427b-8e04-a9d369796380", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Fbus%2F%D7%91%D7%90%D7%99%D7%96%D7%95%20%D7%AA%D7%97%D7%A0%D7%94%20%D7%9C%D7%A8%D7%93%D7%AA.mp3?alt=media&token=43b22d66-e214-4d87-848d-12496ebb48f9", false, 0, true),
      ],

      [
        new Phrase("", "היכן תחנת הרכבת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftrain.PNG?alt=media&token=42334b08-0b56-4ca7-9f42-c49bce05f7a5", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftrain%2F%D7%94%D7%99%D7%9B%D7%9F%20%D7%AA%D7%97%D7%A0%D7%AA%20%D7%94%D7%A8%D7%9B%D7%91%D7%AA.mp3?alt=media&token=ced9a44a-15e9-457c-aa7a-002fb58ecec1", false, 0, true),
        new Phrase("", "מתי הרכבת הבאה תגיע?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fclock.PNG?alt=media&token=2f3ed60a-5e35-4fd6-ae51-053e0568942b", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftrain%2F%D7%9E%D7%AA%D7%99%20%D7%94%D7%A8%D7%9B%D7%91%D7%AA%20%D7%94%D7%91%D7%90%D7%94%20%D7%AA%D7%92%D7%99%D7%A2.mp3?alt=media&token=39a90661-2f75-4cea-93fe-bcd0420546db", false, 0, true),
        new Phrase("", "באיזו תחנה לרדת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftrain_station.PNG?alt=media&token=7283ec4e-a88a-4055-a4f6-9101104d66fd", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftrain%2F%D7%91%D7%90%D7%99%D7%96%D7%95%25%D7%AA%D7%97%D7%A0%D7%94%25%D7%9C%D7%A8%D7%93%D7%AA.mp3?alt=media&token=e10b67b2-5362-4dd4-8aed-0fe120255e88", false, 0, true)
      ],

      [
        new Phrase("", "אני רוצה להזמין מונית", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Ftaxi.PNG?alt=media&token=86c816d9-24b2-49e2-a559-7a4b8c58215a", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%9E%D7%95%D7%A0%D7%99%D7%AA.mp3?alt=media&token=fb240efc-9a06-4836-ae2a-bd1b1081d462", false, 0, true),
        new Phrase("", "אתה יכול להפעיל מונה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fcost.PNG?alt=media&token=b4642c22-c838-45f1-8409-4f66ada76da3", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%AA%D7%94%20%D7%99%D7%9B%D7%95%D7%9C%20%D7%9C%D7%94%D7%A4%D7%A2%D7%99%D7%9C%20%D7%9E%D7%95%D7%A0%D7%94.mp3?alt=media&token=9a4e6009-c811-446b-8b7b-9b1d008e074c", false, 0, true),
        new Phrase("", "אצטרך עצירה נוספת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fdestination.PNG?alt=media&token=1f05a094-877e-4a30-aeb4-0ea685cadc53", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%A6%D7%98%D7%A8%D7%9A%20%D7%A2%D7%A6%D7%99%D7%A8%D7%94%20%D7%A0%D7%95%D7%A1%D7%A4%D7%AA.mp3?alt=media&token=17dba32c-f268-46a2-a204-fd6cbc25e810", false, 0, true),
        new Phrase("", "אני צריך להגיע ל....", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fdestination.PNG?alt=media&token=1f05a094-877e-4a30-aeb4-0ea685cadc53", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%9C%D7%94%D7%92%D7%99%D7%A2%20%D7%9C.mp3?alt=media&token=93084297-0f76-4541-8217-81158647698a", false, 0, true), new Phrase("", "", "", "", 0, "", false, 0, true),
        new Phrase("", "כמה אני צריך לשלם?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fcost.PNG?alt=media&token=b4642c22-c838-45f1-8409-4f66ada76da3", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%9B%D7%9E%D7%94%20%D7%90%D7%A0%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%20%D7%9C%D7%A9%D7%9C%D7%9D.mp3?alt=media&token=40fb1df9-cc9e-4bbd-9dd2-f7c9dd6a4910", false, 0, true),
        new Phrase("", "אתה מקבל כרטיס אשראי?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Fimages%2Fcost.PNG?alt=media&token=b4642c22-c838-45f1-8409-4f66ada76da3", "", 0, "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/app-builder%2Ftravel%2Faudio%2Ftaxi%2F%D7%90%D7%AA%D7%94%20%D7%9E%D7%A7%D7%91%D7%9C%20%D7%9B%D7%A8%D7%98%D7%99%D7%A1%20%D7%90%D7%A9%D7%A8%D7%90%D7%99.mp3?alt=media&token=52e750f2-4146-4a32-8b3a-861a414e5aeb", false, 0, true),
      ],
    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, false);
  
    //AboutMe, this category has its own tab
    cat = new Category(Enums.ABOUT_ME_STRING, "", "", this.userEmail, "", 0, false, null, 0, true)

    phrases = [
      new Phrase("", "קוראים לי", "", "", 0, "", false, 0, true),
      new Phrase("", "טלפון", "", "", 0, "", false, 0, true),
      new Phrase("", "תאריך לידה", "", "", 0, "", false, 0, true),
      new Phrase("", "מצב משפחתי", "", "", 0, "", false, 0, true),
      new Phrase("", "מצב רפואי", "", "", 0, "", false, 0, true),
      new Phrase("", "שפות שאני מדבר", "", "", 0, "", false, 0, true),
      new Phrase("", "מקום הולדתי", "", "", 0, "", false, 0, true),
      new Phrase("", "מקצוע", "", "", 0, "", false, 0, true),
      new Phrase("", "השכלה", "", "", 0, "", false, 0, true),
      new Phrase("", "תחביבים", "", "", 0, "", false, 0, true),
      new Phrase("", "שירות צבאי", "", "", 0, "", false, 0, true),
      new Phrase("", "שנת עליה לישראל", "", "", 0, "", false, 0, true),
    ];

    subCats = [
      new Category("אנשים שאני מכיר", "", "", this.userEmail, "", 0, false, null, 0, true),
    ]

    subPhrases = [
      [
        new Phrase("", "משפחה", "", "", 0, "", false, 0, true),
        new Phrase("", "אישתי", "", "", 0, "", false, 0, true),
        new Phrase("", "ילדים", "", "", 0, "", false, 0, true),
        new Phrase("", "ההורים שלי", "", "", 0, "", false, 0, true),
        new Phrase("", "אחים ואחיות", "", "", 0, "", false, 0, true),
        new Phrase("", "קרובי משפחה נוספים", "", "", 0, "", false, 0, true),
        new Phrase("", "חברים", "", "", 0, "", false, 0, true),
      ],

    ];

    this.add_new_cat_to_db(cat, phrases, subCats, subPhrases, false);  
  } 


}
