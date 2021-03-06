import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/_service/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, OnDestroy {

  eventForm: FormGroup;

  eventSubscriber: Subscription;

  constructor (private fb: FormBuilder, private _eventService: EventService, private router: Router) { }

  ngOnInit (): void {
    this.initEventForm();
  }

  initEventForm () {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      eventDate: [null, Validators.required],
      imageURL: ['', Validators.required],
      price: [null, Validators.required]
    })
  }

  onSubmit (form: FormGroup) {
    this.eventSubscriber = this._eventService.addEvent(form).pipe().subscribe(
      result => {
        if (result === true) {
          this.eventForm.reset();
          this.router.navigate(['/displayEvent']);
        }
      }
    );
  }

  ngOnDestroy () {
    if (this.eventSubscriber) {
      this.eventSubscriber.unsubscribe();
    }
  }
}
