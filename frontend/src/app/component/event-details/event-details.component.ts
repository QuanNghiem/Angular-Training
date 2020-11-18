import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/_service/event.service';
import { PurchaseService } from 'src/app/_service/purchase.service';
import { ViewChild, ElementRef } from '@angular/core';

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

  @ViewChild('closeModal') closeModal: ElementRef;

  constructor (
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private _eventService: EventService,
    private _purchaseService: PurchaseService,
    private _cookieService: CookieService
  ) { }

  ngOnInit (): void {
    this.activatedRouter.paramMap.subscribe(params => {
      this.eventSubscriber = this._eventService.getEvent(params.get("id")).subscribe(data => {
        this.event = data;
      })
    });
    this.initForm();
  }

  initForm () {
    this.ticketForm = this.fb.group({
      amount: [null, [Validators.required]]
    }
    );
  }

  purchaseTickets (form) {
    this.eventSubscriber = this._purchaseService.addTicket(form, this.eventID).subscribe(data => {
      if (data) {
        this.closeModal.nativeElement.click();
        this.router.navigate(['/home']);
      }
    })
  }

  getEventID (id) {
    this.eventID = id;
  }

  checkLogIn () {
    return this._cookieService.check('token');
  }

  ngOnDestroy () {
    if (this.eventSubscriber) {
      this.eventSubscriber.unsubscribe();
    }
  }

}
