import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API_URI: string = 'http://localhost:8000';
  products$: Observable<any> = this.http.get(`${this.API_URI}/products`);

  constructor(private http: HttpClient) { }

  
}
