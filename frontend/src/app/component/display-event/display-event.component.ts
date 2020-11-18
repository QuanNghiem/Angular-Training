import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Events } from 'src/app/model/event';
import { EventService } from 'src/app/_service/event.service';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent implements OnInit, OnDestroy {

  eventSubscriber: Subscription;


  eventList: Events[] = [];

  constructor (private _eventService: EventService) { }

  ngOnInit (): void {
    this.getEvents();
  }

  getEvents () {
    this.eventSubscriber = this._eventService.getEvents().subscribe(data => {
      this.eventList = data;
    })
  }

  ngOnDestroy () {
    if (this.eventSubscriber) {
      this.eventSubscriber.unsubscribe();
    }
  }
}
