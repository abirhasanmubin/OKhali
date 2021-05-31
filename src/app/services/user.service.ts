import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Observable<User>;
  users: Observable<User[]>;
  userCollection: AngularFirestoreCollection<User>;

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.userCollection = this.firestore.collection<User>('users');
  }

  getUser(id: string) {
    this.user = this.userCollection.doc(id).snapshotChanges()
      .pipe(map(action => {
        const data = action.payload.data() as User;
        return data;
      }))
    return this.user;
  }

  addUser(user: User) {
    return this.userCollection.doc(user.userId).set(user);
  }

  updateUser(id: string, user: User) {
    return this.userCollection.doc(id).set(user);
  }

  deleteUser(id: string) {
    return this.userCollection.doc(id).delete();
  }

}
