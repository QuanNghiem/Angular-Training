import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userSubscription: Subscription;
  user: User;

  constructor (private _userService: UserService) { }

  ngOnInit (): void {
    this.initUser();
  }

  initUser () {
    this.userSubscription = this._userService.getUser().subscribe(user => {
      this.user = user;
    });
  }
}
