import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Events } from 'src/app/model/event';
import { EventService } from 'src/app/_service/event.service';

@Component({
  selector: 'app-delete-events',
  templateUrl: './delete-events.component.html',
  styleUrls: ['./delete-events.component.css']
})
export class DeleteEventsComponent implements OnInit, OnDestroy {

  displayModal: boolean;

  selectedID: any;

  eventSubscriber: Subscription;

  eventList: Events[] = [];

  constructor (private _eventService: EventService) { }

  ngOnInit (): void {
    this.getEvents();
  }

  getEvents () {
    this.eventSubscriber = this._eventService.getEventsDelete().subscribe(data => {
      this.eventList = data;
    })
  }

  onDelete () {
    this.eventSubscriber = this._eventService.deleteEvent(this.selectedID).subscribe(data => {
      if (data === true) {
        this.displayModal = false;
        this.getEvents();
      }
    });
  }

  onRemove (id) {
    this.eventSubscriber = this._eventService.removeMarkForDelete(id).subscribe(data => {
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
    if (this.eventSubscriber) {
      this.eventSubscriber.unsubscribe();
    }
  }

}
