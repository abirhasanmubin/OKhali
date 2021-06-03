import { Component, Input, OnInit } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';

@Component({
  selector: 'app-ride-item',
  templateUrl: './ride-item.component.html',
  styleUrls: ['./ride-item.component.css']
})
export class RideItemComponent implements OnInit {

  @Input() ride: Ride;

  constructor() { }

  ngOnInit(): void {
  }

}
