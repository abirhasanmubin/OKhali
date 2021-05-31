import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Vehicle } from '../models/vehicle.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehicle: Observable<Vehicle>;
  vehicles: Observable<Vehicle[]>;
  vehicleCollection: AngularFirestoreCollection<Vehicle>;

  constructor(public firestore: AngularFirestore) {
    this.vehicleCollection = firestore.collection<Vehicle>('vehicles');
    this.vehicles = this.vehicleCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Vehicle;
        const id = a.payload.doc.id;
        data.vehicleId = id;
        return data;
      }))
    )
  }
  addVehicle(vehicle: Vehicle) {
    const id = this.firestore.createId();
    vehicle.vehicleId = id;

    return this.vehicleCollection.doc(vehicle.vehicleId)
      .set(Object.assign({}, vehicle));
  }
  updateVehicle(id: string, vehicle: Vehicle) {
    vehicle.vehicleId = id;
    return this.vehicleCollection.doc(id).set(vehicle);
  }
  deleteVehicle(id: string) {
    return this.vehicleCollection.doc(id).delete();
  }
  getVehicles() {
    return this.vehicles;
  }
  getVehicle(id: string) {
    this.vehicle = this.vehicleCollection.doc(id).snapshotChanges()
      .pipe(map(action => {
        const data = action.payload.data() as Vehicle;
        data.vehicleId = action.payload.id;
        return data;
      }))
    return this.vehicle;
  }
}
