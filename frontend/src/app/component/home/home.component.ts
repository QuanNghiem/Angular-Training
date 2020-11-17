import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Events } from 'src/app/model/event';
import { EventService } from 'src/app/_service/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  eventSubscriber: Subscription;

  eventList: Events[] = [];
  allEventList: Events[] = [];

  constructor (private _eventService: EventService) { }

  ngOnInit (): void {
    this.getEvents();
    this.getAllEvents();
  }

  getEvents () {
    this.eventSubscriber = this._eventService.get3Events().subscribe(data => {
      this.eventList = data;
    })
  }

  getAllEvents () {
    this.eventSubscriber = this._eventService.getEvents().subscribe(data => {
      this.allEventList = data;
    })
  }

  registerEvent (id) {
    this.eventSubscriber = this._eventService.registerEvent(id).subscribe(data => {
      if (data) {
        alert('Event registered!');
      }
    })
  }

  ngOnDestroy () {
    if (this.eventSubscriber) {
      this.eventSubscriber.unsubscribe();
    }
  }
}
