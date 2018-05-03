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

@Injectable()
export class FirebaseProvider {

  usersCollection: AngularFirestoreCollection<User>;
  users: ReplaySubject<User[]> = new ReplaySubject<User[]>()
  _users: User[]

  categoriesCollection: AngularFirestoreCollection<Category>;
  categories: ReplaySubject<Category[]> = new ReplaySubject<Category[]>()
  _categories: Category[]


  constructor(public afs: AngularFirestore, public authentication: AutenticationProvider) {

    //Creating the users collection.
    this.usersCollection = afs.collection<User>('users', ref => ref.orderBy('email', 'desc'));
    this.usersCollection.snapshotChanges().subscribe(result => {
    this._users = result.map(a => {
        let temp = a.payload.doc.data() as User;
        // temp.id = a.payload.doc.id;
        return new User(temp.email)
      });
      this.users.next(this._users);
    });

    // this.importCategories();

  }

  // getUserById(id: string){
  //   return this._users.find(u => u.id === id)
  // }
  get getUsers() {
    return this._users;
  }

  addUser(user: User) {
    return this.usersCollection.add(User.toObject(user));
  }

  public importCategories()
  {
        //Creating the categories collection.
        this.categoriesCollection = this.afs.collection<Category>('categories', ref => ref.orderBy('email', 'desc'));
        this.categoriesCollection.snapshotChanges().subscribe(result => {
        this._categories = result.map(a => {
            let temp = a.payload.doc.data() as Category;
            temp.id = a.payload.doc.id;
            console.log(temp.name);
            // if(temp.getEmail == this.authentication.user.email)
            // {
            return new Category(temp.name, temp.imageURL, temp.email, temp.id);
            // }
          });
          this.categories.next(this._categories);
        });
        console.log(this._categories);
  }

  // getCategoryById(id: string){
  //   return this._users.find(u => u.id === id)
  // }
  get getCategories() {
    return this._categories;
  }

  addCategory(category: Category) {
    return this.categoriesCollection.add(Category.toObject(category));
  }

}