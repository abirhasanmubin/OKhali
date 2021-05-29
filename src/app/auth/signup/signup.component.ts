import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  signUpObs: Observable<AuthResponseData>;

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

      this.signUpObs = this.authService.signup(email, password, name, contact, isDriver);

      this.signUpObs.subscribe(responseData => {
        console.log(responseData);
      });
      this.signUpForm.reset();
    }
  }

  ngOnDestroy() { }

}
