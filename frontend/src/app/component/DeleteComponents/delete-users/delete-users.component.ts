import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent implements OnInit, OnDestroy {

  userSubscriber: Subscription;

  displayModal: boolean;

  selectedID: any;

  userList: User[] = [];

  constructor (private _userService: UserService) { }

  ngOnInit (): void {
    this.getEvents();
  }

  getEvents () {
    this.userSubscriber = this._userService.getUsersDelete().subscribe(data => {
      this.userList = data;
    })
  }

  onDelete () {
    this.userSubscriber = this._userService.deleteUser(this.selectedID).subscribe(data => {
      if (data === true) {
        this.displayModal = false;
        this.getEvents();
      }
    });
  }

  onRemove (id) {
    this.userSubscriber = this._userService.removeMarkForDelete(id).subscribe(data => {
      if (data === true) {
        this.getEvents();
      }
    });
  }

  showModalDialog (i) {
    this.selectedID = i;
    this.displayModal = true;
  }

  ngOnDestroy () {
    if (this.userSubscriber) {
      this.userSubscriber.unsubscribe();
    }
  }
}
