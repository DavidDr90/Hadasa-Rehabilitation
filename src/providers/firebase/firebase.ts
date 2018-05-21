import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Image } from '../../models/image'
import { User } from '../../models/user'
import { List } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { firebaseConfig } from '../../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
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

  phrasesCollection: AngularFirestoreCollection<Phrase>;
  phrases: Observable<Phrase[]> = new Observable<Phrase[]>()

  constructor(public afs: AngularFirestore, public authentication: AutenticationProvider) {

    //Creating the users collection.
    try{
      this.usersCollection = afs.collection<User>('users', ref => ref.orderBy('email', 'desc'));
      this.users = this.usersCollection.snapshotChanges().map(result => {
      return result.map(a => {
          let temp = a.payload.doc.data() as User;
          // temp.id = a.payload.doc.id;
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
    this.categoriesCollection.doc(category.id).delete().then(function() {
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
}