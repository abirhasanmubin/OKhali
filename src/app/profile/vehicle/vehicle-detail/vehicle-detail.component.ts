import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit, OnDestroy {

  vehicle: Vehicle;
  vehicleSub: Subscription;

  constructor(
    public vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.vehicleSub = this.vehicleService
      .getVehicle("7eC6ooS3Hxka0piioBFv").subscribe(data => {
        this.vehicle = data;
      });
  }

  ngOnDestroy() {
    this.vehicleSub.unsubscribe();
  }

}
