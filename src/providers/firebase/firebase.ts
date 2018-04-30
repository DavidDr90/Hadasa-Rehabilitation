import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Image } from '../../models/image'
import { User } from '../../models/user'

@Injectable()
export class FirebaseProvider{
  
  private imageCollections: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) {
     this.imageCollections = afs.collection<any>('users');
  }

  public addImage(image: Image){
    this.imageCollections.add(Image.toObject(image))
  }

  public getImages(){
    this.imageCollections.valueChanges().subscribe(actions => {
      console.log(actions);
    })
  }

  public getImageById(id: string) {
    return this.afs.doc<any>('images/' + id).valueChanges()
    /*this.imageCollections = afs.doc<סוג האובייקט>(‘שם האוסף/שם המסמך’);*/
  }
  

}