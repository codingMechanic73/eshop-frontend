import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string = 'http://localhost:8086';
  constructor(private httpClient: HttpClient) { }

  saveProductToCart(product: Product) {
    localStorage.setItem('product', JSON.stringify(product));
  }

  getProductFromCart(): Product {
    return JSON.parse(localStorage.getItem('product'));
  }

  confirmOrder(order: Order): Observable<any> {
    return this.httpClient.post(`${this.url}/orders`, order).pipe(catchError(this.errorHandler));
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    console.log('error', errorRes);
    localStorage.clear();
    return throwError(errorRes.error);
  }

}
