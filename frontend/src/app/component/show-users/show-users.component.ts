import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { PurchaseService } from 'src/app/_service/purchase.service';
import { UserService } from 'src/app/_service/user.service';

function passwordMatch (form: FormGroup) {
  const password = form.controls['pass'];
  const confirmpassword = form.controls['confirmPass'];

  if (password.value !== confirmpassword.value) {
    form.controls['confirmPass'].setErrors({ notMatch: true });
  } else {
    form.controls['confirmPass'].setErrors(null);
  }
}

function passwordMatchAdd (form: FormGroup) {
  const password = form.controls['passAdd'];
  const confirmpassword = form.controls['confirmPassAdd'];

  if (password.value !== confirmpassword.value) {
    form.controls['confirmPassAdd'].setErrors({ notMatch: true });
  } else {
    form.controls['confirmPassAdd'].setErrors(null);
  }
}

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit, OnDestroy {
  selectedId: number;
  selectedName: string;
  selectedPNo: number;
  selectedEmail: string;

  updateForm: FormGroup;
  addForm: FormGroup;

  userSubscriber: Subscription;
  userList: User[] = [];

  constructor (private fb: FormBuilder, private _userService: UserService, private _purchaseService: PurchaseService) { }

  ngOnInit (): void {
    this.getUsers();
    this.initUpdateForm();
    this.initAddForm();
  }

  initUpdateForm () {
    this.updateForm = this.fb.group({
      username: ['', Validators.required],
      pass: ['', Validators.required],
      confirmPass: [''],
      type: ['', Validators.required],
      pNo: [null, [Validators.required, Validators.maxLength(10)]],
      email: [null, [Validators.required, Validators.email]],
    },
      {
        validators: [passwordMatch]
      }
    );
  }

  initAddForm () {
    this.addForm = this.fb.group({
      usernameAdd: ['', Validators.required],
      passAdd: ['', Validators.required],
      confirmPassAdd: [''],
      typeAdd: ['', Validators.required],
      pNoAdd: [null, [Validators.required, Validators.maxLength(10)]],
      emailAdd: [null, [Validators.required, Validators.email]],
    },
      {
        validators: [passwordMatchAdd]
      }
    );
  }

  onSubmitUpdate (form: FormGroup) {
    this.userSubscriber = this._userService.updateUser(form, this.selectedId).subscribe(data => {
      if (data === true) {
        this.updateForm.reset();
        location.reload(true);
      }
      else {
        this.updateForm.reset();
      }
    })
  }

  onSubmitAdd (form: FormGroup) {
    this.userSubscriber = this._userService.addUser(form).subscribe(data => {
      if (data === true) {
        this.addForm.reset();
        location.reload(true);
      }
      else {
        this.addForm.reset();
      }
    })
  }

  onDelete (id) {
    this.userSubscriber = this._userService.deleteUser(id).subscribe(data => {
      if (data === true) {
        this.userSubscriber = this._purchaseService.deleteByUser(id).subscribe(result => {
          if (data === true) {
            location.reload(true);
          }
        });
      }
    })
  }

  getUsers () {
    this.userSubscriber = this._userService.getUsers().subscribe(data => {
      this.userList = data;
    });
  }

  setId (id, username, pNo, email) {
    this.selectedId = id;
    this.selectedName = username;
    this.selectedPNo = pNo;
    this.selectedEmail = email;
  }

  ngOnDestroy () {
    if (this.userSubscriber) {
      this.userSubscriber.unsubscribe();
    }
  }
}
