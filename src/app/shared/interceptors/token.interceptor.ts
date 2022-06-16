import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.getJwtToken()) {
        request = this.addToken(request, this.authService.getJwtToken())
    }

    return next.handle(request).pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && error.status === 401 ){
        return this.handle401Error(request, next)
      }else {
        return throwError(() => new Error('test'));
      }
    }));
  }


  handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.router.navigateByUrl('')
    return next.handle(request);
  }

  addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
}