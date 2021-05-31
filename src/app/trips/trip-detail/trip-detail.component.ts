import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trips.model';
import { TripService } from 'src/app/services/trip.service';


@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit, OnDestroy {

  trip: Trip;
  tripSub: Subscription;
  constructor(
    private tripService: TripService
  ) {
    this.tripSub = this.tripService.getTrip("nV9ju4V6QDsP1LwLBgJx").subscribe(data => {
      this.trip = data;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.tripSub.unsubscribe();
  }

}
