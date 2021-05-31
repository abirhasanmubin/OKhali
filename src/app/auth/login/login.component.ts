import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginSub: Subscription;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', Validators.required)
    })

  }

  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value['email'];
      let password = this.loginForm.value['password'];
      this.authService.login(email, password);
    }
    this.loginForm.reset();
  }

  ngOnDestroy() {
  }

}
