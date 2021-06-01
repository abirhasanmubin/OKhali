import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  signUpSub: Subscription;

  constructor(
    private authService: AuthService,
  ) {
    this.signUpForm = new FormGroup({
      'fullName': new FormControl('', Validators.required),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'contact': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'isDriver': new FormControl(false, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      let values = this.signUpForm.value;
      let name = values['fullName'];
      let email = values['email'];
      let contact = values['contact'];
      let password = values['password'];
      let isDriver = values['isDriver'];

      let tempUser = new User(name, email, contact, isDriver);

      this.authService.signup(tempUser, password);
      this.signUpForm.reset();
    }
  }

  ngOnDestroy() {
  }

}
