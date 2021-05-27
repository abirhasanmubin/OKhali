import { Injectable, OnInit, OnDestroy } from '@angular/core';

import {
  AngularFirestore, AngularFirestoreCollection
} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements OnInit, OnDestroy {

  constructor(
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
