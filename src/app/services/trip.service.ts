import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Trip } from '../models/trips.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  trip: Observable<Trip>;
  trips: Observable<Trip[]>;
  tripCollection: AngularFirestoreCollection<Trip>

  constructor(
    private firestore: AngularFirestore,

  ) {
    this.tripCollection = this.firestore.collection<Trip>('trips');

    this.trips = this.tripCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Trip;
          return data;
        })
      }));
  }

  getTrips() {
    return this.trips;
  }

  getTrip(id: string) {
    this.trip = this.tripCollection.doc(id).snapshotChanges()
      .pipe(map(action => {
        const data = action.payload.data() as Trip;
        return data;
      }))
    return this.trip;
  }

  getUserTrips(userId: string) {
    return this.trips.pipe(map(trips => {
      return trips.filter(trip => trip.userId === userId);
    }))
  }

  addTrip(trip: Trip) {
    const id = this.firestore.createId();
    trip.tripId = id;
    return this.tripCollection.doc(id).set(Object.assign({}, trip)).then(() => {
      return id;
    });
  }

  updateTrip(id: string, trip: Trip) {
    return this.tripCollection.doc(id).set(Object.assign({}, trip));
  }

  deleteTrip(id: string) {
    return this.tripCollection.doc(id).delete();
  }
}
