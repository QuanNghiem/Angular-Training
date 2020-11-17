import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/_service/user.service';

function passwordMatch (form: FormGroup) {
  const password = form.controls['passR'];
  const confirmpassword = form.controls['confirmPassR'];

  if (password.value !== confirmpassword.value) {
    form.controls['confirmPassR'].setErrors({ notMatch: true });
  } else {
    form.controls['confirmPassR'].setErrors(null);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  userSubscriber: Subscription;

  registerForm: FormGroup;

  constructor (private fb: FormBuilder, private _userService: UserService, private router: Router) { }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler () {
    this._userService.logout();
  }

  ngOnInit (): void {
    this.registerForm = this.fb.group({
      usernameR: ['', Validators.required],
      passR: ['', Validators.required],
      confirmPassR: ['']
    },
      {
        validators: [passwordMatch]
      });
  }

  onSubmitR (form: FormGroup) {
    this.userSubscriber = this._userService.registerUser(form).pipe().subscribe(
      result => {
        if (result === true) {
          this.router.navigate(['/home']);
        }
      },
      err => {
        console.log(err);
      }
    );
    this.registerForm.reset();
  }

  ngOnDestroy () {
    if (this.userSubscriber) {
      this.userSubscriber.unsubscribe();
    }
  }
}
