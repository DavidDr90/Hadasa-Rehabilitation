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

@Injectable()
export class FirebaseProvider {

  usersCollection: AngularFirestoreCollection<User>;
  users: ReplaySubject<User[]> = new ReplaySubject<User[]>()
  _users: User[]

  constructor(public afs: AngularFirestore) {

    this.usersCollection = afs.collection<User>('users', ref => ref.orderBy('name', 'desc'));
    this.usersCollection.snapshotChanges().subscribe(result => {
    this._users = result.map(a => {
        let temp = a.payload.doc.data() as User;
        temp.id = a.payload.doc.id;
        return new User(temp.name, temp.lastname, temp.id)
      });
      this.users.next(this._users);
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

}