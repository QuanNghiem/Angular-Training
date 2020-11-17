import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor (private _cookieService: CookieService, private _userService: UserService) { }

  ngOnInit (): void {
  }

  verifyAdmin () {
    if (this._cookieService.get('admin') === 'true') {
      return true;
    }
    else {
      return false;
    }
  }

  checkLogIn () {
    return this._cookieService.check('token');
  }

  onLogout () {
    this._userService.logout();
  }
}
