import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ride } from '../models/ride.model';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  rides: Observable<Ride[]>;
  ride: Observable<Ride>;
  rideCollection: AngularFirestoreCollection<Ride>;

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.rideCollection = this.firestore.collection<Ride>('rides');

    this.rides = this.rideCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Ride;
          return data;
        })
      }));
  }

  getRides() {
    return this.rides;
  }

  getRide(id: string) {
    this.ride = this.rideCollection.doc(id).snapshotChanges()
      .pipe(map(action => {
        const data = action.payload.data() as Ride;
        return data;
      }))

    return this.ride;
  }

  getUserRides(userId: string) {
    return this.rides.pipe(map(trips => {
      return trips.filter(ride => ride.riderId === userId);
    }))
  }

  addRide(ride: Ride) {
    const id = this.firestore.createId();
    ride.rideId = id;
    return this.rideCollection.doc(id).set(Object.assign({}, ride)).then(() => {
      return id;
    });
  }

  updateRide(id: string, ride: Ride) {
    return this.rideCollection.doc(id).set(Object.assign({}, ride));
  }

  deleteRide(id: string) {
    return this.rideCollection.doc(id).delete();
  }

}
