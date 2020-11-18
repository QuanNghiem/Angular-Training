import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Events } from '../model/event';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // private url: string = 'http://localhost:3000/events';

  constructor (private client: HttpClient) { }

  public getEvents (): Observable<Events[]> {
    return this.client.get<Events[]>(environment.BASE_API_URL + "events/getEvents");
  }

  public get3Events (): Observable<Events[]> {
    return this.client.get<Events[]>(environment.BASE_API_URL + "events/getUpcomingEvents");
  }

  public getEvent (id): Observable<Events> {
    const body = {
      "eventID": id
    }
    return this.client.post<Events>(environment.BASE_API_URL + "events/getEvent", body).pipe(
      map(
        result => {
          return result;
        },
        () => {
          return null;
        }
      )
    );
  }

  public addEvent (form: FormGroup): Observable<boolean> {
    const body = {
      "name": form.value.name,
      "description": form.value.description,
      "location": form.value.location,
      "eventDate": form.value.eventDate,
      "imageURL": form.value.imageURL,
      "price": form.value.price
    };

    return this.client.post<Events>(environment.BASE_API_URL + 'events/addEvent', body).pipe(
      map(
        result => {
          return true;
        },
        error => {
          return false;
        }
      )
    );
  }

  // public registerEvent (id: any): Observable<boolean> {
  //   const body = {
  //     "eventID": id
  //   };

  //   return this.client.put<{ status: boolean }>(environment.BASE_API_URL + 'users/updateUserEvent', body).pipe(
  //     map(result => {
  //       if (result.status === false) {
  //         return false;
  //       }
  //       else {
  //         return true;
  //       }
  //     })
  //   );
  // }
}
