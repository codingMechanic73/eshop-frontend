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

  url: string = 'http://localhost:8086/auth'

  constructor(private httpClient: HttpClient) { }

  createAccount(userdetails: UserDetails) {
    return this.httpClient
      .post<UserDetails>(`${this.url}/register`, userdetails)
      .pipe(catchError(this.errorHandler));
  }

  signin(userCredentials: UserCredentials) {
    return this.httpClient
      .post<User>(`${this.url}/login`, userCredentials)
      .pipe(catchError(this.errorHandler),
        tap((responseUser: User) => {
          this.saveUser(responseUser);
          this.user.next(responseUser);
        }))
  }

  saveUser(user: User) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    this.httpClient.get<UserDetails>(this.url,)
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getToken() {
    return localStorage.getItem('token');
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

}
