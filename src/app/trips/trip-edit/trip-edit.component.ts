import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trips.model';
import { User } from 'src/app/models/user.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit, OnDestroy {

  tripForm: FormGroup;
  id: string;
  editMode: boolean;
  trip: Trip;
  tripSub: Subscription;
  user: User;

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.tripSub = this.tripService.getTrip(this.id).subscribe(data => {
          this.trip = data;
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
    let from = '';
    let to = '';
    let date = null;
    if (this.editMode) {
      let time = new Date(this.trip.tripDate.toDate()).toISOString().slice(0, 10);
      this.tripForm = new FormGroup({
        'from': new FormControl(this.trip.tripFrom, Validators.required),
        'to': new FormControl(this.trip.tripTo, Validators.required),
        'date': new FormControl(time, Validators.required),
      });
    }
    else {
      this.tripForm = new FormGroup({
        'from': new FormControl('', Validators.required),
        'to': new FormControl('', Validators.required),
        'date': new FormControl('', Validators.required),
      });
    }
  }

  onSubmit() {
    if (this.tripForm.valid) {
      let from = this.tripForm.value['from'];
      let to = this.tripForm.value['to'];
      let date = new Date(this.tripForm.value['date']);

      if (!this.editMode) {
        let tempTrip: Trip;
        tempTrip = new Trip(from, to, date, 'created', this.user.userId, null, null, null);
        this.tripService.addTrip(tempTrip).then(responseData => {
          this.router.navigate(['/trips', responseData])
        })
      }
      else {
        this.trip.tripFrom = from;
        this.trip.tripTo = to;
        this.trip.tripDate = date;
        this.trip.tripStatus = "created";
        this.tripService.updateTrip(this.id, this.trip).then(() => {
          this.router.navigate(['/trips', this.id]);
        })
      }
    }
    this.tripForm.reset();
  }

  ngOnDestroy() {
    if (this.editMode) {
      this.tripSub.unsubscribe();
    }
  }
}
