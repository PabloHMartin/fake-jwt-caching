import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AuthForm } from '../models/Auth-form.model';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly API_URI: string = 'http://localhost:8000';
  private loggedUser: string = '';

  constructor(private http: HttpClient ) { }

  login(userInfo: AuthForm): Observable<boolean> {
    return this.http.post<any>(`${this.API_URI}/auth/login`, userInfo)
                  .pipe(
                    tap(token => this.doLoginUser(userInfo.email, token.access_token)),
                    map(val => true),
                    catchError(error => {
                      alert(error.message)
                      return of(false)
                    })
                  )
  }

  doLoginUser(email: string, token: string): void {
    this.loggedUser = email;
    this.storeToken(token); 
  }
  storeToken(token: string) {
     localStorage.setItem('jwt-token', token);
  }

  getJwtToken() {
    return localStorage.getItem('jwt-token');
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

}

