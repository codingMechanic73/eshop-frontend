import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserCredentials } from 'src/app/model/userCredentials';
import { UserDetails } from 'src/app/model/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  url: string = 'http://localhost:8086'

  constructor(private httpClient: HttpClient) { }

  createAccount(userdetails: UserDetails) {
    return this.httpClient
      .post<UserDetails>(`${this.url}/auth/register`, userdetails)
      .pipe(catchError(this.errorHandler));
  }

  signin(userCredentials: UserCredentials) {
    return this.httpClient
      .post<User>(`${this.url}/auth/login`, userCredentials)
      .pipe(catchError(this.errorHandler),
        tap((responseUser: User) => {
          console.log(responseUser)
          this.saveUser(responseUser);
          this.user.next(responseUser);
        }))
  }

  fetchUserDetails() {
    return this.httpClient.get<UserDetails>(`${this.url}/users/details`).pipe(catchError(this.errorHandler), tap((response) => {
      this.saveLocal('userDetails', response);
      console.log(response);
    }))
  }

  saveUser(user: User) {
    this.saveLocal('token', user.token);
    this.saveLocal('user', user)
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserDetails(): UserDetails {
    return this.getLocal('userDetails');
  }

  getUserRole(): string {
    return this.getUserDetails().role;
  }

  getToken() {
    return this.getLocal('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  signOut() {
    localStorage.clear();
    this.user.next(null);
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    console.log('error', errorRes);
    localStorage.clear();
    return throwError(errorRes.error);
  }

  private saveLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getLocal(key) {
    return JSON.parse(localStorage.getItem(key));
  }

}
