import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trips.model';
import { TripService } from 'src/app/services/trip.service';


@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit, OnDestroy {

  id: string;
  trip: Trip;
  tripSub: Subscription;
  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.tripSub = this.tripService.getTrip(this.id).subscribe(data => {
        this.trip = data;
      })
    })
  }

  onDelete() {
    this.tripService.deleteTrip(this.id);
    this.router.navigate(['/trips']);
  }

  ngOnDestroy() {
    this.tripSub.unsubscribe();
  }

}
