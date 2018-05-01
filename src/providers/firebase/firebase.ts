import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Image } from '../../models/image'
import { User } from '../../models/user'
import { List } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider{

  private usersCollection: AngularFirestoreCollection<any>;
  private users = [];

  constructor(private afs : AngularFirestore) 
  {
    const settings = { timestampsInSnapshots: true }
    afs.app.firestore().settings(settings);
     this.usersCollection = afs.collection<any>('users');
     this.users = [];
  }

  public addUser(user: User){
    this.usersCollection.add(User.toObject(user))
  }

  public getUsers()
  {
    this.usersCollection.valueChanges().subscribe(collection => 
      {
        collection.forEach(col => {
            this.users.push(new User(col['name'], col['lastname']));
          });
      }
    )
    return this.users;
  }
}