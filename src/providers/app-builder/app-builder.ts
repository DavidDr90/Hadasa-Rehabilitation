import { Injectable } from '@angular/core';
import { Phrase } from '../../models/Phrase'
import { Category } from '../../models/Category'
import { User } from '../../models/user'
import { HomePage } from '../../pages/home/home';
import { PhrasesProvider } from '../phrases/phrases';
import { CategoryServiceProvider } from '../category-service/category-service';

/**
 * this provider create the defult categorys and phrases when the app is first load
 */


@Injectable()
export class AppBuilderProvider {
   public userEmail


  constructor(public categoryProvider:CategoryServiceProvider, public phraseProvider:PhrasesProvider) {
    this.userEmail=HomePage.userEmail;
  }

   //===================================
  /**this method create and add new phrase to the user DB.
   * @param name, the name of the phrase
   * @param imageURL, the imageURL of the phrase's image
   * @param categoryID, the ID of the category which the phrase belong to
   * @param audio, the URL of the audio file of the phrase.
   */

  createDefPhrase(name:string, imageURL:string, categoryID:string, audio:string){
    let phr=new Phrase("", name, imageURL, categoryID, 0, "", false);
   this.phraseProvider.addPhrase(phr);
  }

   //===================================
  /**this method create and add new category to the user DB.
   * @param name, the name of the category
   * @param imageURL, the imageURL of the category's image
   * @param parentCategoryID, the ID of the category which the category belong to
   * @param userEmail the email of the user that want to add this shit
   * @returns the new category ID.
   */
  createDefCat(name:string, imageURL:string, parentCategoryID:string, userEmail:string){
    let cat=new Category(name, "", imageURL, userEmail, parentCategoryID, 0, false);
    this.categoryProvider.addCategory(cat);
   }

  //===================================
  /**this method fill the DB for the user with the default categories&phrases
  */
  fillDB(){
     let promise;//the promise of the new category id
     let cat:Category;//the category to be added
     let catId: string; //the ID of the category to be added
    
     //add feeling category
     this.createDefCat("רגשות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2F%E2%80%8F%E2%80%8Ffeelings.PNG?alt=media&token=921bff5c-c031-41b3-b1d0-efe4c622e542", "", this.userEmail)
     setTimeout(()=>{
      promise=this.categoryProvider.getCategoryByName("רגשות");
      promise.then((data)=>{
        cat=data;
        cat as Category;
        catId=cat.id
        this.createDefPhrase("עצב", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Fsad.PNG?alt=media&token=8a4bdf52-f492-484d-ba11-6ccbb9f66cc0", catId, "");
        this.createDefPhrase("צחוק", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Flaugh.PNG?alt=media&token=f576ff92-73f0-42dd-85dc-8a297d451e82", catId, "");
        this.createDefPhrase("עצבנות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Fangry.PNG?alt=media&token=0ecb050c-b1a1-4194-be54-26e6211c0c78", catId, "");
        this.createDefPhrase("הפתעה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2F%E2%80%8F%E2%80%8Fsuprised.PNG?alt=media&token=054d3372-15c5-4908-8bc0-7ee7b34de013", catId, "");
        this.createDefPhrase("שמחה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Fhappy.PNG?alt=media&token=bfe22262-b0c3-4f0c-883a-c61be196d1d7", catId, "");
        this.createDefPhrase("בהלה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2Ffreaking_out.PNG?alt=media&token=2f35b76c-89d6-49d9-b676-e751d8391f1e", catId, "");
        this.createDefPhrase("אדישות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/feelings%2F%E2%80%8F%E2%80%8Fapathetic.PNG?alt=media&token=9880b9ee-7a16-4c52-a9f6-787e9b52b4fc", catId, "");
      
      })  }, 3000);


      //add medicine category
      this.createDefCat("רפואה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%E2%80%8F%E2%80%8Fmadical.PNG?alt=media&token=62e9e247-658e-454d-87aa-6886aa0bab99", "", this.userEmail)
      setTimeout(()=>{
        promise=this.categoryProvider.getCategoryByName("רפואה");
        promise.then((data)=>{
          cat=data;
          cat as Category;
          catId=cat.id;
          this.createDefPhrase("סקלת כאב", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%20scale.PNG?alt=media&token=383577d6-fcda-4e1f-99be-8663747010ec", catId, "");
          let subCatId:string;//the sub category ID
          
        this.createDefCat("ראש", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2Fheadache.PNG?alt=media&token=afedb4f0-fc3a-4f05-96b6-1f0b79db71ca", catId, this.userEmail)
        setTimeout(()=>{
            promise=this.categoryProvider.getCategoryByName("ראש");
            promise.then((data)=>{
              cat=data;
              cat as Category;
              subCatId=cat.id;
              this.createDefPhrase("כאב ראש", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2Fheadache.PNG?alt=media&token=afedb4f0-fc3a-4f05-96b6-1f0b79db71ca", subCatId, "");
              this.createDefPhrase("סחרחורת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2Fdizziness.PNG?alt=media&token=9cbb1c67-b3f8-4f05-8c94-bd559ff2768c", subCatId, "");
              this.createDefPhrase("עייפות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2F%E2%80%8F%E2%80%8Fsleepy.PNG?alt=media&token=b581e0b8-486d-4e2e-ae77-9532bff5a91c", subCatId, "");
              this.createDefPhrase("חום גבוהה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fhead%2F%E2%80%8F%E2%80%8Fmedical_thermometer.PNG?alt=media&token=42bc7671-3857-429d-9d58-81d6363c4f38", subCatId, "");
          }) }, 3000);
          
          
        this.createDefCat("בטן", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fstomach.PNG?alt=media&token=7275b1fd-c78f-4c62-9416-b492be982dce", catId, this.userEmail)
        setTimeout(()=>{
          promise=this.categoryProvider.getCategoryByName("בטן"); 
          promise.then((data)=>{
            cat=data;
            cat as Category;
            subCatId=cat.id;
            this.createDefPhrase("כאב בטן", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fstomach.PNG?alt=media&token=7275b1fd-c78f-4c62-9416-b492be982dce", subCatId, "");
            this.createDefPhrase("הקאות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fvomit.PNG?alt=media&token=7e1dbeb1-1b01-4183-ab90-2d86fc824dfe", subCatId, "");
            this.createDefPhrase("שלשולים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fdiarrhea.PNG?alt=media&token=f1006241-be46-40b8-91cc-4624691bfac5", subCatId, "");
            this.createDefPhrase("כאבי מחזור", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fstomach%2Fmenses.PNG?alt=media&token=0930a278-c87c-4add-8c79-01011973942f", subCatId, "");
          }) }, 3000);


          this.createDefCat("אף אוזן גרון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fotolaryngology%2Fotolaryngology.PNG?alt=media&token=f35024a9-3735-4f95-af28-6b668da2f2bf", catId, this.userEmail)
          setTimeout(()=>{
            promise=this.categoryProvider.getCategoryByName("אף אוזן גרון");
            promise.then((data)=>{
              cat=data;
              cat as Category;
              subCatId=cat.id;
              this.createDefPhrase("צינון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fotolaryngology%2Fnose%20pain.PNG?alt=media&token=dbfc4da9-2957-4247-989b-5a5575494218", subCatId, "");
              this.createDefPhrase("כאב גרון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fotolaryngology%2Fsore_throat.PNG?alt=media&token=95f56244-ed00-444a-912f-2536a7f4c6de", subCatId, "");
              this.createDefPhrase("כאב אוזניים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fotolaryngology%2Fear_pain.PNG?alt=media&token=03d6c863-3224-42ec-b4cc-2660b93d1bd4", subCatId, "");
          }) }, 3000);


          this.createDefCat("חזה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fchest%2Fchest.PNG?alt=media&token=c4b85e58-d4a9-4d8f-8db8-f56d9eda4893", catId, this.userEmail)
          setTimeout(()=>{
            promise=this.categoryProvider.getCategoryByName("חזה");
            promise.then((data)=>{
              cat=data;
              cat as Category;
              subCatId=cat.id;
              this.createDefPhrase("כאב בחזה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fchest%2Fchest.PNG?alt=media&token=c4b85e58-d4a9-4d8f-8db8-f56d9eda4893", subCatId, "");
              this.createDefPhrase("צרבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fchest%2Fheartburn.PNG?alt=media&token=54023580-40e9-431a-84b8-f885751b0fff", subCatId, "");
          }) }, 3000);


          this.createDefCat("מצב נפשי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Fmental_health.PNG?alt=media&token=786e2909-457a-48ec-bc0b-f1da4af93660", catId, this.userEmail)
          setTimeout(()=>{
            promise=this.categoryProvider.getCategoryByName("מצב נפשי");
            promise.then((data)=>{
              cat=data;
              cat as Category;
              subCatId=cat.id;
              this.createDefPhrase("דיכאון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2F%E2%80%8F%E2%80%8Fdepression.PNG?alt=media&token=c3a3affb-f6ae-4f23-a6bd-0cb137f33033", subCatId, "");
              this.createDefPhrase("בדידות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Floneliness.PNG?alt=media&token=3ea7007b-e2ac-48ee-a91c-0b6e5d0837ee", subCatId, "");
              this.createDefPhrase("חרדה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Fanxiety_panic.PNG?alt=media&token=b71ebc5e-a1b2-42bf-bb79-38294589a7af", subCatId, "");
              this.createDefPhrase("קשיים בהרדמות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Finsomnia.PNG?alt=media&token=61741bab-e173-466a-9b3e-a4ede96486f1", subCatId, "");
              this.createDefPhrase("מחשבות אובדניות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fmental%20health%2Fsuicidal.PNG?alt=media&token=e85534d3-65be-406c-a2c3-72a850698fce", subCatId, "");
          }) }, 3000);


          this.createDefCat("רופאים ואנשי מקצוע", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fchest%2Fchest.PNG?alt=media&token=c4b85e58-d4a9-4d8f-8db8-f56d9eda4893", catId, this.userEmail)
          setTimeout(()=>{
            promise=this.categoryProvider.getCategoryByName("רופאים ואנשי מקצוע");
            promise.then((data)=>{
              cat=data;
              cat as Category;
              subCatId=cat.id;
              this.createDefPhrase("נוירולוג", "", subCatId, "");
              this.createDefPhrase("קלינאית תקשורת", "", subCatId, "");
              this.createDefPhrase("רופא משפחה", "", subCatId, "");
              this.createDefPhrase("כירוג", "", subCatId, "");
              this.createDefPhrase("עובדת סוציאלית", "", subCatId, "");
              this.createDefPhrase("פיזיותרפיסט", "", subCatId, "");
          }) }, 3000);


          this.createDefCat("בדיקות רפואיות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2F%E2%80%8F%E2%80%8Fmedica_test.PNG?alt=media&token=52ae7fac-4634-48c0-b5da-de6cd6eb96db", catId, this.userEmail)
          setTimeout(()=>{
            promise=this.categoryProvider.getCategoryByName("בדיקות רפואיות");
            promise.then((data)=>{
              cat=data;
              cat as Category;
              subCatId=cat.id;
              this.createDefPhrase("בדיקות דם", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2Fblood_test.PNG?alt=media&token=578016f0-4eb6-4889-8fa0-684d0de712d4", subCatId, "");
              this.createDefPhrase("מרשם לתרופות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2F%E2%80%8F%E2%80%8Fpreception.PNG?alt=media&token=f5f457ef-fecc-47d8-b63f-bbabf4372d69", subCatId, "");
              this.createDefPhrase("חיסון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2F%E2%80%8F%E2%80%8FVaccination.PNG?alt=media&token=527b43e3-d046-4cff-a380-027058ad4272", subCatId, "");
              this.createDefPhrase("צילום", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2F%D7%91%D7%93%D7%99%D7%A7%D7%95%D7%AA%2Fxray.PNG?alt=media&token=32a5843e-4fae-4cc3-807a-56a9a27848dc", subCatId, "");
          }) }, 3000);


          this.createDefCat("סוגי כאב", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%2Fpain.PNG?alt=media&token=e8b2f4da-cdb3-4068-941b-9d23fd3d3250", catId, this.userEmail)
          setTimeout(()=>{
            promise=this.categoryProvider.getCategoryByName("סוגי כאב");
            promise.then((data)=>{
              cat=data;
              cat as Category;
              subCatId=cat.id;
              this.createDefPhrase("מגרד", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%2Fitchy.PNG?alt=media&token=0c074821-80c5-4b47-90fe-75afbc7229aa", subCatId, "");
              this.createDefPhrase("שורף", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%2Fburning_pain.PNG?alt=media&token=ed1c5a18-7d0a-4635-9fbf-e4bd769869b6", subCatId, "");
              this.createDefPhrase("דוקר", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/medicine%20category%2Fpain%2Fstabbing_pain.PNG?alt=media&token=8d32bd24-cc3f-4f23-80fc-ff4ba4cd8a03", subCatId, "");
          }) }, 3000);
      
        }) }, 3000);

      
      this.createDefCat("חפצים אישיים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Fpersonal%20stuff.PNG?alt=media&token=bd9ebcf2-edbe-4288-b716-d76f2d57d757", "", this.userEmail)
      setTimeout(()=>{
        promise=this.categoryProvider.getCategoryByName("חפצים אישיים");
          promise.then((data)=>{
                  cat=data;
                  cat as Category;
                  catId=cat.id;
                  this.createDefPhrase("פלאפון", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Ftelephone.PNG?alt=media&token=8facc469-58e1-4cbf-97c8-58e35ef03f98", catId, "");
                  this.createDefPhrase("מפתחות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Fkeys.PNG?alt=media&token=6d1e23a0-3d1b-491d-8cad-06d3933c2991", catId, "");
                  this.createDefPhrase("שעון יד", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2F%E2%80%8F%E2%80%8FhandWatch.PNG?alt=media&token=f700ab57-b100-4859-93c9-f2df5573b6fb", catId, "");
                  this.createDefPhrase("משקפיים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2F%E2%80%8F%E2%80%8Fglasses.PNG?alt=media&token=005fca74-de01-4d3c-927a-90b3896684ca", catId, "");
                  this.createDefPhrase("משקפי שמש", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Fsun_glasses.PNG?alt=media&token=e046d0d9-08d2-4a68-8da6-c4fbff001275", catId, "");
                  this.createDefPhrase("ארנק", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2F%E2%80%8F%E2%80%8Fwallet.PNG?alt=media&token=b197d718-8f9d-4055-8136-a316746338a8", catId, "");
                  this.createDefPhrase("כסף", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/personal%20stuff%2Fmoney.PNG?alt=media&token=63622875-4e2a-496d-ad71-646f00960058", catId, "");
                })
          }, 3000);

      

      
      this.createDefCat("חנויות וקניות", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Fshopping.PNG?alt=media&token=8e2dd23f-299b-4249-bd24-24f181d0ef15", "", this.userEmail)
      setTimeout(()=>{
          promise=this.categoryProvider.getCategoryByName("חנויות וקניות"); 
          promise.then((data)=>{
              cat=data;
              cat as Category;
              catId=cat.id;
              this.createDefPhrase("אפשר למדוד?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Ftry_on.PNG?alt=media&token=e074d980-5013-4864-89f3-950c73d57a02", catId, "");
              this.createDefPhrase("היכן תאי המדידה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Ffitting_room.PNG?alt=media&token=4ff29a91-15b9-48e6-b82d-f2466cdb1459", catId, "");
              this.createDefPhrase("כמה זה עולה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Fprice_tag.PNG?alt=media&token=0ebc4362-aeaa-41e4-8f64-28a71bf45259", catId, "");
              this.createDefPhrase("אפשר לשלם?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/shopping%2Fpay.PNG?alt=media&token=50df1d7e-dc60-413b-9c2f-9e86be89a01b", catId, "");
              
            })}, 3000);
        
      this.createDefCat("מסעדות ובתי קפה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Frestaurant.PNG?alt=media&token=047df647-d0e8-473c-ad9c-539cddde60bb", "", this.userEmail)
      setTimeout(()=>{
        promise=this.categoryProvider.getCategoryByName("מסעדות ובתי קפה"); 
        promise.then((data)=>{
              cat=data;
              cat as Category;
              catId=cat.id;
              this.createDefPhrase("אפשר תפריט בבקשה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Fmenu.PNG?alt=media&token=5c410fde-72fa-44ed-a474-e61f80be096b", catId, "");
              this.createDefPhrase("אפשר להזמין בבקשה", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Forder.PNG?alt=media&token=161163bf-0154-4c68-bcc0-cd7ea0d86c99", catId, "");
              this.createDefPhrase("מה מומלץ להזמין?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Frocommend.PNG?alt=media&token=fa5b88b8-ecb6-4dec-a652-8514b4a8c0f8", catId, "");
              this.createDefPhrase("אפשר להזמין חשבון בבקשה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Fpay.PNG?alt=media&token=60cfeacb-161e-4d16-9106-2e3e1c746867", catId, "");
              this.createDefPhrase("טעים מאוד", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Ftasty.PNG?alt=media&token=3417a74d-d4a3-4135-a7dc-4cf3755d7a91", catId, "");
              this.createDefPhrase("לא טעים לי", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/restaurant%2Fnot%20tasty.PNG?alt=media&token=b929f780-b095-4bdb-8f1e-aa336950df93", catId, "");
            })}, 3000);

      

        
      this.createDefCat("אמצעי תחבורה ציבוריים", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fpublic_transport.PNG?alt=media&token=1d88c9c6-74ca-4cd2-af8b-316262066b17", "", this.userEmail)
      setTimeout(()=>{
        promise=this.categoryProvider.getCategoryByName("אמצעי תחבורה ציבוריים"); promise.then((data)=>{
              cat=data;
              cat as Category;
              catId=cat.id;
              this.createDefPhrase("כמה עולה הנסיעה?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fcost.PNG?alt=media&token=de24f054-5144-4b80-9a03-40c468259268", catId, "");
              this.createDefPhrase("כיצד מגיעים ליעד?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fdestination.PNG?alt=media&token=5d304751-75b8-433d-a4fd-866c7744b818", catId, "");
              this.createDefPhrase("מונית", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Ftaxi.PNG?alt=media&token=a4422fb9-00f8-4b75-84c3-aadc353ee915", catId, "");
              let subCatId:string;

              this.createDefCat("אוטובוס", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fbus.PNG?alt=media&token=78fcbe9b-c9ac-4a03-89f9-504a18d144a7", catId, this.userEmail)
              setTimeout(()=>{
                promise=this.categoryProvider.getCategoryByName("אוטובוס");
                promise.then((data)=>{
                  cat=data;
                  cat as Category;
                  subCatId=cat.id;
                  this.createDefPhrase("היכן תחנת האוטובוס?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fstation.PNG?alt=media&token=0457acca-663b-45c1-9811-99d3980e12f3", subCatId, "");
                  this.createDefPhrase("מתי האוטובוס הבא צריך להגיע?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fclock.PNG?alt=media&token=522355b8-099d-462c-99a9-efeef1f774f9", subCatId, ""); 
                  this.createDefPhrase("באיזו תחנה לרדת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fdestination.PNG?alt=media&token=5d304751-75b8-433d-a4fd-866c7744b818", subCatId, ""); 
                })}, 3000);

            this.createDefCat("רכבת", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Ftrain.PNG?alt=media&token=3649588a-7674-4428-8935-4de8e024c650", catId, this.userEmail)
              setTimeout(()=>{
                promise=this.categoryProvider.getCategoryByName("רכבת");
                promise.then((data)=>{
                  cat=data;
                  cat as Category;
                  subCatId=cat.id;
                  this.createDefPhrase("היכן תחנת הרכבת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Ftrain_station.PNG?alt=media&token=c3b523c3-d65f-4809-87bb-e313cefa7871", subCatId, "");
                  this.createDefPhrase("מתי הרכבת הבאה צריכה להגיע?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fclock.PNG?alt=media&token=522355b8-099d-462c-99a9-efeef1f774f9", subCatId, "");
                  this.createDefPhrase("באיזו תחנה לרדת?", "https://firebasestorage.googleapis.com/v0/b/lets-talk-b433e.appspot.com/o/public%20transport%2Fdestination.PNG?alt=media&token=5d304751-75b8-433d-a4fd-866c7744b818", subCatId, ""); 
                })}, 3000);
              
              
            })}, 3000);


   }

}
