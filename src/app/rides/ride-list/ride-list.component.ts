import { Component, OnInit } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit {

  rides: Ride[];

  constructor() { }

  ngOnInit(): void {
  }

}
