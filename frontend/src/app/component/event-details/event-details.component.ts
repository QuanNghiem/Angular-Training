import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/_service/event.service';
import { PurchaseService } from 'src/app/_service/purchase.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, OnDestroy {

  eventSubscriber: Subscription;

  event;

  eventID;

  ticketForm: FormGroup;

  constructor (private fb: FormBuilder, private router: ActivatedRoute, private _eventService: EventService, private _purchaseService: PurchaseService) { }

  ngOnInit (): void {
    this.router.paramMap.subscribe(params => {
      this.eventSubscriber = this._eventService.getEvent(params.get("id")).subscribe(data => {
        this.event = data;
      })
    });
    this.initForm();
  }

  initForm () {
    this.ticketForm = this.fb.group({
      amount: [0, [Validators.required]]
    }
    );
  }

  purchaseTickets (form) {
    this.eventSubscriber = this._purchaseService.addEvent(form, this.eventID).subscribe(data => {
      if (data) {
        document.getElementById('closeForm').click();
        alert('Event registered!');
      }
    })
  }

  getEventID (id) {
    this.eventID = id;
  }

  ngOnDestroy () {
    if (this.eventSubscriber) {
      this.eventSubscriber.unsubscribe();
    }
  }

}
