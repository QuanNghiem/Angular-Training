import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/_service/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, OnDestroy {

  myForm: FormGroup;

  eventSubscriber: Subscription;

  constructor (private fb: FormBuilder, private _eventService: EventService) { }

  ngOnInit (): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      registStart: [null, Validators.required],
      registEnd: [null, Validators.required],
      eventDate: [null, Validators.required],
      imageURL: ['', Validators.required],
    })
  }

  onSubmit (form: FormGroup) {
    this.eventSubscriber = this._eventService.addEvent(form).pipe().subscribe(
      result => {
        if (result === true) {
          alert('Event created!');
          this.myForm.reset();
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
