import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ride } from 'src/app/models/ride.model';
import { User } from 'src/app/models/user.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit, OnDestroy {

  rides: Ride[];
  user: User;
  rideSub: Subscription;

  constructor(
    private rideService: RideService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.rideSub = this.rideService.getUserRides(this.user?.userId).subscribe(data => {
      this.rides = data;
      this.rides.sort((rideA: Ride, rideB: Ride) => {
        if (rideA.startTime < rideB.startTime) return 1;
        else if (rideA.startTime > rideB.startTime) return -1;
        else return 0;
      });
    })
  }
  ngOnDestroy() {
    this.rideSub.unsubscribe();
  }

}
