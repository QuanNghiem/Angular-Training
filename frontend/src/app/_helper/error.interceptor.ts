import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor (private _userService: UserService, private router: Router) { }

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this._userService.logout();
          alert('Token expired. Please login again.');
          this.router.navigate(['/home']);
        }

        if (err.status === 500) {
          alert('Something went wrong. Please try again!');
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }
      )
    );
  }
}
