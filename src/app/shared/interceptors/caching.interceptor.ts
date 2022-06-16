import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheResolverService } from '../services/cache-resolver.service';

const SECONDS_IN_CACHE = 10;

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cacheResolver: CacheResolverService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // only caching GET request
    if(request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cacheResolver.get(request.url);
    // check if request is in cache
    // if is in chache we return it
    // if it is not in chache we want to forward the request and save it into cache 
    return cachedResponse ? of(cachedResponse) : this.fordwardRequest(request, next);
  
  }
  fordwardRequest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    return next.handle(request).pipe(
      tap((event) => {
        if(event instanceof HttpResponse) {
          this.cacheResolver.set(request.url, event, SECONDS_IN_CACHE);
        }
      })
    );


  }
}

export const CacheInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CachingInterceptor,
  multi: true,
}