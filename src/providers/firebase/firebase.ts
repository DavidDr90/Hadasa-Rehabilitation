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


@Injectable()
export class FirebaseProvider {

  usersCollection: AngularFirestoreCollection<User>;
  users: ReplaySubject<User[]> = new ReplaySubject<User[]>()
  _users: User[]

  categoriesCollection: AngularFirestoreCollection<Category>;
  categories: ReplaySubject<Category[]> = new ReplaySubject<Category[]>()
  _categories: Category[]


  constructor(public afs: AngularFirestore) {

    //Firestore settings
    const firestore = afs.firestore;
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

    //Creating the users collection.
    this.usersCollection = afs.collection<User>('users', ref => ref.orderBy('name', 'desc'));
    this.usersCollection.snapshotChanges().subscribe(result => {
    this._users = result.map(a => {
        let temp = a.payload.doc.data() as User;
        temp.id = a.payload.doc.id;
        return new User(temp.name, temp.lastname, temp.id)
      });
      this.users.next(this._users);
    });

    //Creating the categories collection.
    this.categoriesCollection = afs.collection<Category>('categories', ref => ref.orderBy('name', 'desc'));
    this.categoriesCollection.snapshotChanges().subscribe(result => {
    this._categories = result.map(a => {
        let temp = a.payload.doc.data() as Category;
        temp.id = a.payload.doc.id;
        return new Category(temp.name, temp.imageURL, temp.id);
      });
      this.categories.next(this._categories);
    });

  }

  getUserById(id: string){
    return this._users.find(u => u.id === id)
  }
  get getUsers() {
    return this._users;
  }

  addUser(user: User) {
    return this.usersCollection.add(User.toObject(user));
  }


  getCategoryById(id: string){
    return this._users.find(u => u.id === id)
  }
  get getCategories() {
    return this._categories;
  }

  addCategory(category: Category) {
    return this.categoriesCollection.add(Category.toObject(category));
  }

}