import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }


  get currentUser(): User|undefined {

    if ( !this.user ) return undefined;
    return structuredClone(this.user);

  }


  login(email: string, password: string): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user => this.user = user ),
      tap( user => localStorage.setItem('token', 'dkjljdj2.mlnj2ni.mx2928' )),
    );
  }


  checkAuthentication(): Observable<boolean> {

    if (!localStorage.getItem('token')) of(false)

    const token = localStorage.getItem('token')

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      )

  }



  logout(){
    this.user = undefined;
    localStorage.clear();
  }




}
