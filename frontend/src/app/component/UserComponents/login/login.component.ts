import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userSubscriber: Subscription;

  loginForm: FormGroup;

  constructor (private fb: FormBuilder, private _userService: UserService, private router: Router) {
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler () {
    this._userService.logout();
  }

  ngOnInit (): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  onSubmit (form: FormGroup) {
    this.userSubscriber = this._userService.loginUser(form).pipe().subscribe(
      result => {
        if (result === true) {
          this.userSubscriber = this._userService.verifyUser().subscribe(data => {
            this.router.navigate(['/home']);
            this.loginForm.reset();
          })
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy () {
    if (this.userSubscriber) {
      this.userSubscriber.unsubscribe();
    }
  }
}
