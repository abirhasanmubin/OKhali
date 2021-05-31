import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/trips.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {

  tripForm: FormGroup;

  constructor(
    private tripService: TripService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tripForm = new FormGroup({
      'from': new FormControl('', Validators.required),
      'to': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.tripForm.valid) {
      let from = this.tripForm.value['from'];
      let to = this.tripForm.value['to'];
      let date = new Date(this.tripForm.value['date']);


      let tempTrip = new Trip(from, to, date, 'created', null, null);


      this.tripService.addTrip(tempTrip).then(responseData => {
        this.router.navigate(['/trips', responseData])
      })
    }
    this.tripForm.reset();
  }

}
