import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Purchase } from '../model/purchase';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor (private client: HttpClient) { }

  // public getEvents (): Observable<Events[]> {
  //   return this.client.get<Events[]>(environment.BASE_API_URL + "events/getEvents");
  // }

  // public getEvent (id): Observable<Events> {
  //   const body = {
  //     "eventID": id
  //   }
  //   return this.client.post<Events>(environment.BASE_API_URL + "events/getEvent", body).pipe(
  //     map(
  //       result => {
  //         return result;
  //       },
  //       () => {
  //         return null;
  //       }
  //     )
  //   );
  // }

  public getEvents (): Observable<Purchase[]> {
    return this.client.get<Purchase[]>(environment.BASE_API_URL + "purchases/getPurchasesHistory");
  }

  public addEvent (form: FormGroup, id): Observable<Purchase> {
    const body = {
      "eventID": id,
      "amount": form.value.amount,
    };

    return this.client.post<Purchase>(environment.BASE_API_URL + 'purchases/buyTicket', body).pipe(
      map(
        result => {
          return result;
        },
        (error: any) => {
          return error;
        }
      )
    );
  }
}
