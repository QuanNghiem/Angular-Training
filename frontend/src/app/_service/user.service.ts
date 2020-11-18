import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private url: string = 'http://localhost:3000/users';

  constructor (private client: HttpClient, private _cookie: CookieService) { }

  public registerUser (form: FormGroup): Observable<boolean> {
    const body = {
      "username": form.value.usernameR,
      "password": form.value.passR,
      "type": 0,
      "pNo": form.value.pNo,
      "email": form.value.email
    };

    return this.client.post<{ token: any, username: any }>(environment.BASE_API_URL + 'users/register', body).pipe(
      map(result => {
        if (result.token === null) {
          return false;
        }
        else {
          this._cookie.set('token', result.token);
          //console.log(this._cookie.get('token'));
          return true;
        }
      })
    );
  }

  public loginUser (form: FormGroup): Observable<boolean> {
    const body = {
      "username": form.value.username,
      "password": form.value.pass
    };

    return this.client.post<{ token: string, username: string }>(environment.BASE_API_URL + 'users/login', body).pipe(
      map(result => {
        if (result.token === null) {
          return false;
        }
        else {
          this._cookie.set('token', result.token);
          return true;
        }
      })
    );
  }

  public verifyUser (): Observable<boolean> {
    return this.client.get<{ auth: boolean }>(environment.BASE_API_URL + 'users/verify').pipe(
      map(result => {
        if (result.auth === false) {
          return false;
        }
        else if (result.auth === true) {
          this._cookie.set('admin', 'true');
          return true;
        }
      })
    );
  }

  public addUser (form: FormGroup): Observable<boolean> {
    const body = {
      "username": form.value.usernameAdd,
      "password": form.value.passAdd,
      "type": form.value.typeAdd,
      "pNo": form.value.pNoAdd,
      "email": form.value.emailAdd
    };

    return this.client.post<{ token: any, username: any }>(environment.BASE_API_URL + 'users/register', body).pipe(
      map(result => {
        if (result.token === null) {
          return false;
        }
        else {
          return true;
        }
      })
    );
  }

  public updateUser (form: FormGroup, id: any): Observable<boolean> {
    const body = {
      "_id": id,
      "username": form.value.username,
      "password": form.value.pass,
      "type": form.value.type
    };

    return this.client.put<{ status: boolean }>(environment.BASE_API_URL + 'users/updateUser', body).pipe(
      map(result => {
        if (result.status === false) {
          return false;
        }
        else {
          return true;
        }
      })
    );
  }

  public deleteUser (id): Observable<boolean> {
    return this.client.delete<{ status: boolean }>(environment.BASE_API_URL + 'users/deleteUser/' + id).pipe(
      map(result => {
        if (result.status === false) {
          return false;
        }
        else {
          return true;
        }
      })
    );
  }

  public getUsers (): Observable<User[]> {
    return this.client.get<User[]>(environment.BASE_API_URL + "users/getUsers");
  }

  public getUser (): Observable<User> {
    return this.client.get<User>(environment.BASE_API_URL + "users/getUser");
  }

  public logout () {
    this._cookie.deleteAll('/');
  }
}
