import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ride } from 'src/app/models/ride.model';
import { User } from 'src/app/models/user.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.css']
})
export class RideDetailComponent implements OnInit {

  ride: Ride;
  id: string;
  rideSub: Subscription;
  user: User;
  constructor(
    private rideService: RideService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.rideSub = this.rideService.getRide(this.id).subscribe(data => {
        this.ride = data;
      })
    })
  }

  onDelete() {
    this.rideService.deleteRide(this.id);
    this.router.navigate(['/rides']);
  }

  ngOnDestroy() {
    this.rideSub.unsubscribe();
  }

}
