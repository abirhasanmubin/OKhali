// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { AngularFireAuth } from "@angular/fire/auth";
// import { Router } from "@angular/router";
// import { throwError } from "rxjs";
// import { catchError, tap } from "rxjs/operators";
// import { User } from "../models/user.model";
// import { UserService } from "./user.service";


// export interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {

//   isLoggedin: boolean = false;

//   userData: any;

//   signupUrl: string
//     = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYroLcNUSv3PihR38oy6jk584qb3E8cMo'

//   signinUrl: string
//     = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYroLcNUSv3PihR38oy6jk584qb3E8cMo'

//   constructor(
//     private http: HttpClient,
//     private userService: UserService,
//     private router: Router,
//     private fireAuth: AngularFireAuth,
//   ) {
//     this.fireAuth.authState.subscribe(user => {
//       if (user) {
//         this.userData = user;
//         localStorage.setItem('user', JSON.stringify(this.userData));
//       }
//       else {
//         localStorage.setItem('user', null);
//       }
//     })
//   }

//   signup(user: User, password: string) {
//     return this.http.post<AuthResponseData>(this.signupUrl, {
//       email: user.userEmail,
//       password: password,
//       returnSecureToken: true
//     }).pipe(catchError(this.handleError),
//       tap(responseData => {
//         const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
//         user.token = responseData.idToken;
//         user.tokenExpired = expirationDate;
//         user.userId = responseData.localId;
//         this.userService.addUser(Object.assign({}, user));
//         this.router.navigate(['/login']);
//       }))
//   }

//   login(email: string, password: string) {
//     return this.fireAuth.signInWithEmailAndPassword(email, password)
//       .then(result => {
//         this.router.navigate(['/trips']);
//         this.setUserData(result.user)
//       })
//       .catch(error => {
//         console.log(error);;

//       })
//   }

//   setUserData(user) {
//     const userRef = AngularFireAuth
//   }


//   logout() {
//     this.isLoggedin = false;
//     localStorage.removeItem("loginData");
//   }

//   private handleError(errorRes: HttpErrorResponse) {
//     let errorMessage = "An unknown error occurred!";
//     if (!errorRes.error || !errorRes.error.error) {
//       return throwError(errorMessage)
//     }
//     switch (errorRes.error.error.message) {
//       case 'INVALID_EMAIL':
//         errorMessage = "The email address is invalid";
//         break;
//       case 'EMAIL_EXISTS':
//         errorMessage = "The email address is already in use by another account.";
//         break;
//       case 'TOO_MANY_ATTEMPTS_TRY_LATER':
//         errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
//         break;
//       case 'EMAIL_NOT_FOUND':
//       case 'INVALID_PASSWORD':
//         errorMessage = 'The Email or Password is incorrect.'
//         break;
//     }
//     return throwError(errorMessage);
//   }

// }



