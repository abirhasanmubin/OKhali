import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit, OnDestroy {

  vehicle: Vehicle;
  vehicleForm: FormGroup;
  vehicleId: string;
  isEditMode: boolean = false;
  vehicleSub: Subscription;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.vehicleId = params['id'];
      this.isEditMode = params['id'] != null;
      if (this.isEditMode) {
        this.vehicleSub = this.vehicleService.getVehicle(this.vehicleId)
          .subscribe(data => {
            this.vehicle = data;
            this.initForm();
          });
      }
      else {
        this.initForm();
      }

    })
  }

  initForm() {
    if (!this.isEditMode) {
      this.vehicleForm = new FormGroup({
        'vehicleName': new FormControl(null, Validators.required),
        'vehicleCompany': new FormControl(null, Validators.required),
        'vehicleType': new FormControl(null, Validators.required),
        'noOfSeats': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*/)
        ]),
      })
    }
    else {
      this.vehicleForm = new FormGroup({
        'vehicleName': new FormControl(this.vehicle.vehicleName, Validators.required),
        'vehicleCompany': new FormControl(this.vehicle.vehicleCompany, Validators.required),
        'vehicleType': new FormControl(this.vehicle.vehicleType, Validators.required),
        'noOfSeats': new FormControl(this.vehicle.noOfSeats, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*/)
        ]),
      })
    }
  }

  onSubmit() {
    let name = this.vehicleForm.value['vehicleName'];
    let company = this.vehicleForm.value['vehicleCompany'];
    let type = this.vehicleForm.value['vehicleType'];
    let seats = this.vehicleForm.value['noOfSeats'];
    if (!this.isEditMode) {
      let newVehicle = new Vehicle(
        name,
        company,
        type,
        seats
      )
      this.vehicleService.addVehicle(newVehicle).then(res => {
        this.vehicleId = res;
      })
    }
    else {
      this.vehicle.vehicleName = name;
      this.vehicle.vehicleCompany = company;
      this.vehicle.vehicleType = type;
      this.vehicle.noOfSeats = seats;
      this.vehicleService.updateVehicle(this.vehicleId, this.vehicle);
    }
    this.router.navigate(['/profile', 'vehicle', this.vehicleId]);
    this.vehicleForm.reset();
  }

  ngOnDestroy() {
    this.vehicleSub.unsubscribe();
  }
}

