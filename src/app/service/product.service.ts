import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { SearchCriteria } from 'src/app/model/searchCriteria';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'http://localhost:8086/products';

  allProducts: Product[];

  constructor(private httpClient: HttpClient) { }

  getCategories() {
    return this.httpClient.get<string[]>(`${this.url}/categories`).pipe(catchError(this.errorHandler))
  }

  getAllProducts(searchCriteria: SearchCriteria) {
    const params = new HttpParams()
      .set('category', searchCriteria.category)
      .set('name', searchCriteria.name)
      .set('direction', searchCriteria.direction)
      .set('pageNumber', searchCriteria.pageNo.toString())
      .set('pageSize', searchCriteria.pageSize.toString())
      .set('sortBy', searchCriteria.sortBy);
    return this.httpClient
      .get(`${this.url}`, { params })
      .pipe(catchError(this.errorHandler), tap((response) => {
        this.allProducts = response['content'];
      }));
  }

  getProductById(id) {
    return this.httpClient.get<Product>(`${this.url}/${id}`).pipe(catchError(this.errorHandler));
  }

  errorHandler(errorRes: HttpErrorResponse) {
    console.log('error', errorRes);
    return throwError(errorRes.error);
  }
}
