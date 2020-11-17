import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor (private router: Router, private _userService: UserService) { }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._userService.verifyUser().subscribe(data => {
      if (data === true) {
        return true;
      }
      else {
        this.router.navigate(['/home']);
        return false;
      }
    },
      err => {
        this.router.navigate(['/home']);
        return false;
      }
    );
    return true;
  }

  canLoad (
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._userService.verifyUser().subscribe(data => {
      if (data === true) {
        return true;
      }
      else {
        this.router.navigate(['/home']);
        return false;
      }
    },
      err => {
        this.router.navigate(['/home']);
        return false;
      }
    );
    return true;
  }
}
