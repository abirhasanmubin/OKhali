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
      this.trips.sort((tripA: Trip, tripB: Trip) => {
        if (tripA.tripDate < tripB.tripDate) return 1;
        else if (tripA.tripDate > tripB.tripDate) return -1;
        else return 0;
      });
    })
  }

  ngOnDestroy() {
    this.tripSub.unsubscribe();
  }

}
