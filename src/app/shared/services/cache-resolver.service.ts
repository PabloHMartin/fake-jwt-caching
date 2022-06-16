import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheResolverService {

  private cache = new Map<string, [Date, HttpResponse<any>]>();

  constructor() { }

  set(key: string, value: any, secondsInCache: number = 0): void {
    const expiresIn = new Date();
    expiresIn.setSeconds(expiresIn.getSeconds() + secondsInCache);
    this.cache.set(key, [expiresIn, value])
  }

  get(key: string){
    const tuple = this.cache.get(key);

    if(!tuple){
      return null
    }

    const expiresIn = tuple[0];
    const httpSavedResponse = tuple[1];
    const now = new Date();

    if(expiresIn.getTime() < now.getTime()) {
      this.cache.delete(key);
      return null;
    }

    return httpSavedResponse;

  }

}
