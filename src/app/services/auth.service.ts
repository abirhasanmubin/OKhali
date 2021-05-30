import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Subscription, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "../models/user.model";
import { UserService } from "./user.service";


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {

  user = new Subject<User>();
  userSubscription: Subscription;

  signupUrl: string
    = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYroLcNUSv3PihR38oy6jk584qb3E8cMo'

  signinUrl: string
    = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYroLcNUSv3PihR38oy6jk584qb3E8cMo'


  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  signup(email: string, password: string, name: string,
    contact: string, isDriver: boolean) {
    return this.http.post<AuthResponseData>(this.signupUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap(responseData => {

        this.handleSignUp(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn,
          name,
          contact,
          isDriver
        )
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signinUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn,
        )
      }));
  }

  private handleSignUp(email: string, userId: string, token: string, expiresIn: number,
    name: string, contact: string, isDriver: boolean) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    let tempUser: User;

    tempUser = new User(
      userId,
      name,
      email,
      contact,
      isDriver,
      token,
      expirationDate,
    );

    this.userService.addUser(tempUser);
    this.router.navigate(['/login']);

  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    let tempUser: User;
    let userSubscription = this.userService.getUser(userId).subscribe(data => {
      tempUser = data;
    });
    console.log(tempUser);
    this.user.next(tempUser);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'INVALID_EMAIL':
        errorMessage = "The email address is invalid";
        break;
      case 'EMAIL_EXISTS':
        errorMessage = "The email address is already in use by another account.";
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'The Email or Password is incorrect.'
        break;
    }
    return throwError(errorMessage);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
