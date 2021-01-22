import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomInterceptorService implements HttpInterceptor {

  baseUrl = 'http://localhost:8086';

  apiToSkip = ['/auth/login',
    '/auth/register',
    '/products/categories',
    '/products',
    '/products/detail/'];


  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const skip = this.apiToSkip.find(api => {
      return req.url.indexOf(api) > 0;
    });
    if (skip) {
      return next.handle(req);
    }
    req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${this.authService.getToken()}`) });
    console.log(req);
    return next.handle(req);
  }
}
