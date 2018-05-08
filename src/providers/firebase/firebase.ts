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

@Injectable()
export class FirebaseProvider {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]> = new Observable<User[]>()

  categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]> = new Observable<Category[]>()


  constructor(public afs: AngularFirestore, public authentication: AutenticationProvider) {

    //Creating the users collection.
    this.usersCollection = afs.collection<User>('users', ref => ref.orderBy('email', 'desc'));
    this.users = this.usersCollection.snapshotChanges().map(result => {
    return result.map(a => {
        let temp = a.payload.doc.data() as User;
        // temp.id = a.payload.doc.id;
        return temp;
      });
    });
  }

  public importCategories()
  {
    //Creating the categories collection.
    this.categoriesCollection = this.afs.collection<Category>('categories', ref => ref.orderBy('email', 'desc'));
    this.categories = this.categoriesCollection.snapshotChanges().map(result => {
      return result.map(a => {
        let temp = a.payload.doc.data() as Category;
        temp.id = a.payload.doc.id;
        return temp;
      });
    });
  }

  // move to UserService or something.... 
  // getUserByEmail(email: string){
  //   return this._users.find(u => u.email === email)
  // }

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
    this.categoriesCollection.add(Category.toObject(category));
  }

}