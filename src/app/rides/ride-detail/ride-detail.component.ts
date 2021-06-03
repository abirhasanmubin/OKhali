import { Component, OnInit } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.css']
})
export class RideDetailComponent implements OnInit {

  ride: Ride;
  id: string;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {

  }

}
