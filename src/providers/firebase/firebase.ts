import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../../models/user'
import { Category } from '../../models/Category';
import { AutenticationProvider } from '../../providers/autentication/autentication';
import { Observable } from 'rxjs/Observable';
import { Phrase } from '../../models/Phrase';

@Injectable()
export class FirebaseProvider {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]> = new Observable<User[]>()

  categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]> = new Observable<Category[]>()
  categoryDoc: AngularFirestoreDocument<Category>;
  category: Observable<Category>;

  phrasesCollection: AngularFirestoreCollection<Phrase>;
  phrases: Observable<Phrase[]> = new Observable<Phrase[]>()
  phraseDoc: AngularFirestoreDocument<Phrase>;
  phrase: Observable<Phrase>;

  constructor(public afs: AngularFirestore, public authentication: AutenticationProvider) {
    //first import the users collection , mainly to get the current users's attrs.
    this.importUsers()
  }

   //import all users from DB to Observable object
  public importUsers(){
    try{
      this.usersCollection = this.afs.collection<User>('users', ref => ref.orderBy('email', 'desc'));
      this.users = this.usersCollection.snapshotChanges().map(result => {
      return result.map(a => {
          let temp = a.payload.doc.data() as User;
          return temp;
        });
      });
    }
    catch(e){
      console.log(e.message)
    }
  }

  //import all categories from DB to Observable object
  //**note: need to fix: imports of spesific user
  public importCategories()
  {
    //Creating the categories collection of the CURRENT USER!!!!!!!! ha ha
    try{
      this.categoriesCollection = this.afs.collection<Category>('categories', ref => ref.where('userEmail', '==', this.authentication.user.email));
      this.categories = this.categoriesCollection.snapshotChanges().map(result => {
        return result.map(a => {
          let temp = a.payload.doc.data() as Category;
          temp.id = a.payload.doc.id;
          return temp;
        });
      });
    }
    catch(e){
      console.log(e.message)
    }
  }

  //import all phrases from DB to observable object.
  //**note: need to fix: imports of spesific user
  public importPhrases(category: Category)
  {
    try{
      //Creating the phrases collection of specific category of current user
      this.phrasesCollection = this.afs.collection<Phrase>('phrases', ref => ref.where('categoryID','==',category.id));
      //this.phrasesCollection = this.afs.collection<Phrase>('phrases', ref => ref.orderBy('name', 'desc'));
      this.phrases = this.phrasesCollection.snapshotChanges().map(result => {
        return result.map(a => {
          let temp = a.payload.doc.data() as Phrase;
          temp.id = a.payload.doc.id;
          return temp;
        });
      });
    }
      catch(e){
        console.log(e.message)
      }
  }

  get getUsersObservable() {
    return this.users
  }

  addUser(user: User) {
    return this.usersCollection.add(User.toObject(user));
  }

  get getCategoriesObservable() {
    return this.categories;
  }

  addCategory(category: Category) {    
    return this.categoriesCollection.add(Category.toObject(category));
  }

  removeCategory(category: Category){
    this.categoriesCollection.doc(category.id ).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  get getPhrasesObservable() {
    return this.phrases;
  }

  addPhrase(phrase: Phrase) {
    return this.phrasesCollection.add(Phrase.toObject(phrase));
  }

  removePhrase(phrase: Phrase){
    this.phrasesCollection.doc(phrase.id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

    /**
   * Update fields of a document without overwriting the entire document.
   * @param phrase, the phrase with a new properties
   */
  updatePhrase(phrase: Phrase){
    this.phraseDoc = this.afs.doc<Phrase>('phrases/${phrase.id}');
    this.phrase = this.phraseDoc.valueChanges();
  }

    /**
   * Update fields of a document without overwriting the entire document.
   * @param category, the category with a new properties
   */
  updateCategory(category: Category){
    this.categoryDoc = this.afs.doc<Category>('categories/${category.id}');
    this.category = this.categoryDoc.valueChanges();
  }

}