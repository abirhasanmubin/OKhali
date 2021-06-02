import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isDriver: boolean;
  vehicleId: string;

  constructor() { }

  ngOnInit(): void {
    this.isDriver = JSON.parse(localStorage.getItem('userData')).isVehicleOwner;
    this.vehicleId = JSON.parse(localStorage.getItem('userData')).vehicleId;

  }

}
