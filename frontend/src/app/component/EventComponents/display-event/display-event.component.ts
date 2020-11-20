import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Events } from 'src/app/model/event';
import { EventService } from 'src/app/_service/event.service';
import { PurchaseService } from 'src/app/_service/purchase.service';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent implements OnInit, OnDestroy {

  eventSubscriber: Subscription;

  eventForm: FormGroup;

  eventList: Events[] = [];

  selectedEventID: any;

  constructor (private _eventService: EventService, private fb: FormBuilder) { }

  ngOnInit (): void {
    this.getEvents();
    this.initEventForm();
  }

  getEvents () {
    this.eventSubscriber = this._eventService.getEvents().subscribe(data => {
      this.eventList = data;
    })
  }

  onDelete (id) {
    this.eventSubscriber = this._eventService.markForDelete(id).subscribe(data => {
      if (data === true) {
        this.getEvents();
      }
    });
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

  updateForm (event: Events) {
    this.selectedEventID = event._id;
    this.eventForm.setValue({
      name: event.name,
      description: event.description,
      location: event.location,
      eventDate: event.eventDate,
      imageURL: event.imageURL,
      price: event.price
    });
  }

  onSubmit (form: FormGroup) {
    this.eventSubscriber = this._eventService.updateEvent(form, this.selectedEventID).pipe().subscribe(
      result => {
        if (result === true) {
          this.eventForm.reset();
          this.getEvents();
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
