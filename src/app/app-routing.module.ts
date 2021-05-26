import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { VehicleDetailComponent } from './profile/profile/vehicle/vehicle-detail/vehicle-detail.component';
import { VehicleEditComponent } from './profile/profile/vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleComponent } from './profile/profile/vehicle/vehicle.component';
import { TripDetailComponent } from './trips/trip-detail/trip-detail.component';
import { TripEditComponent } from './trips/trip-edit/trip-edit.component';
import { TripListComponent } from './trips/trip-list/trip-list.component';
import { TripStartComponent } from './trips/trip-start/trip-start.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "trips", component: TripsComponent, children: [
      { path: "", component: TripListComponent },
      { path: ":id", component: TripDetailComponent },
      { path: ":id/edit", component: TripEditComponent },
      { path: "id/delete", component: TripEditComponent },
    ]
  },
  {
    path: "profile", component: ProfileComponent, children: [
      { path: "", component: ProfileDetailComponent },
      { path: "edit", component: ProfileEditComponent },
      {
        path: "vehicle", component: VehicleComponent, children: [
          { path: "", component: VehicleDetailComponent },
          { path: "edit", component: VehicleEditComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
