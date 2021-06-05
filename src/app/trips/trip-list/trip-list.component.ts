import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trips.model';
import { User } from 'src/app/models/user.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy {

  trips: Trip[];
  tripSub: Subscription;
  user: User;
  searchForm: FormGroup;

  constructor(
    private tripService: TripService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    if (this.user?.isVehicleOwner) {
      this.tripSub = this.tripService.getTrips().subscribe(data => {
        this.trips = data;
        this.trips.sort((tripA: Trip, tripB: Trip) => {
          if (tripA.tripDate < tripB.tripDate) return 1;
          else if (tripA.tripDate > tripB.tripDate) return -1;
          else return 0;
        });
      })
    }
    else {
      this.tripSub = this.tripService.getUserTrips(this.user?.userId)
        .subscribe(data => {
          this.trips = data;
          this.trips.sort((tripA: Trip, tripB: Trip) => {
            if (tripA.tripDate < tripB.tripDate) return 1;
            else if (tripA.tripDate > tripB.tripDate) return -1;
            else return 0;
          });
        })

    }
    this.searchForm = new FormGroup({
      'from': new FormControl(null),
      'to': new FormControl(null)
    })
  }

  ngOnDestroy() {
    this.tripSub.unsubscribe();
  }

}
