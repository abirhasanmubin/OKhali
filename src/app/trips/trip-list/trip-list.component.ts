import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trips.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy {

  trips: Trip[];
  tripSub: Subscription

  constructor(
    private tripService: TripService,
  ) { }

  ngOnInit(): void {
    this.tripSub = this.tripService.getTrips().subscribe(data => {
      this.trips = data;
    })
  }

  ngOnDestroy() {
    this.tripSub.unsubscribe();
  }

}
