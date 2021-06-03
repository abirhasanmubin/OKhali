import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ride } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-edit',
  templateUrl: './ride-edit.component.html',
  styleUrls: ['./ride-edit.component.css']
})
export class RideEditComponent implements OnInit, OnDestroy {

  rideForm: FormGroup;
  id: string;
  editMode: boolean;
  ride: Ride;
  rideSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rideService: RideService,
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.rideSub = this.rideService.getRide(this.id).subscribe(data => {
          this.ride = data;
          this.initForm();
        })
      }
      else {
        this.initForm();
      }
    })
  }

  ngOnInit(): void {
  }

  initForm() {
    if (this.editMode) {
      let startT = this.ride.startTime.toDate();
      let endT = this.ride.endTime.toDate();
      const offset = startT.getTimezoneOffset()

      let startTime = new Date(startT - (offset * 60 * 1000));
      let endTime = new Date(endT - (offset * 60 * 1000));

      let start = startTime.toISOString().slice(0, 16);
      let end = endTime.toISOString().slice(0, 16);

      this.rideForm = new FormGroup({
        'from': new FormControl(this.ride.rideFrom, Validators.required),
        'to': new FormControl(this.ride.rideTo, Validators.required),
        'start': new FormControl(start, Validators.required),
        'end': new FormControl(end, Validators.required),
      });
    }
    else {
      this.rideForm = new FormGroup({
        'from': new FormControl('', Validators.required),
        'to': new FormControl('', Validators.required),
        'start': new FormControl('', Validators.required),
        'end': new FormControl('', Validators.required),
      });
    }
  }

  onSubmit() {
    let from = this.rideForm.value['from'];
    let to = this.rideForm.value['to'];
    let start = new Date(this.rideForm.value['start']);
    let end = new Date(this.rideForm.value['end']);
    if (this.rideForm.valid) {
      if (!this.editMode) {
        let tempRide: Ride;
        tempRide = new Ride(from, to, start, end, "created", null, null, null);
        this.rideService.addRide(tempRide).then(responseData => {
          this.router.navigate(['/rides', responseData])
        })
      }
      else {
        this.ride.rideFrom = from;
        this.ride.rideTo = to;
        this.ride.startTime = start;
        this.ride.endTime = end;

        this.rideService.updateRide(this.id, this.ride).then(() => {
          this.router.navigate(['/rides', this.id]);
        })
      }
    }
    this.rideForm.reset();
  }

  ngOnDestroy() {
    if (this.editMode) {
      this.rideSub.unsubscribe();
    }
  }

}
