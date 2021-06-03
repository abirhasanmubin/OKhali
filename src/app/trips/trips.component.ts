import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit, OnDestroy {


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }

}
