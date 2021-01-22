import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  url: string = 'http://localhost:8086/user-addresses';
  constructor(private httpClient: HttpClient) { }

  addAddress(address: Address) {
    return this.httpClient.post<Address>(this.url, address).pipe(catchError(this.errorHandler));
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    console.log('error', errorRes);
    localStorage.clear();
    return throwError(errorRes.error);
  }
}
