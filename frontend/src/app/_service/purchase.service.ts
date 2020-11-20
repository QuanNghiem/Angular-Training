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

  public getTickets (): Observable<Purchase[]> {
    return this.client.get<Purchase[]>(environment.BASE_API_URL + "purchases/getPurchasesHistory");
  }

  public getSales (id): Observable<Purchase[]> {
    const body = {
      "eventID": id,
    };
    return this.client.post<Purchase[]>(environment.BASE_API_URL + 'purchases/getSales', body).pipe(
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

  public addTicket (form: FormGroup, id): Observable<Purchase> {
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

  public markForDelete (id: any): Observable<boolean> {
    const body = {
      "_id": id
    };

    return this.client.put<{ status: boolean }>(environment.BASE_API_URL + 'purchases/markForDeleteEvent', body).pipe(
      map(result => {
        if (result.status === false) {
          return false;
        }
        else {
          return true;
        }
      })
    );
  }

  public removeMarkForDelete (id: any): Observable<boolean> {
    const body = {
      "_id": id
    };

    return this.client.put<{ status: boolean }>(environment.BASE_API_URL + 'purchases/removeMarkForDelete', body).pipe(
      map(result => {
        if (result.status === false) {
          return false;
        }
        else {
          return true;
        }
      })
    );
  }

  // public markForDeleteUser (id: any): Observable<boolean> {
  //   const body = {
  //     "userID": id
  //   };

  //   return this.client.put<{ status: boolean }>(environment.BASE_API_URL + 'purchases/markForDeleteUser', body).pipe(
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

  public deleteByUser (id): Observable<boolean> {
    return this.client.delete<{ status: boolean }>(environment.BASE_API_URL + 'purchases/deleteByUser/' + id).pipe(
      map(result => {
        if (result.status === false) {
          return false;
        }
        else {
          return true;
        }
      })
    );
  }

  public deleteByEvent (id): Observable<boolean> {
    return this.client.delete<{ status: boolean }>(environment.BASE_API_URL + 'purchases/deleteByEvent/' + id).pipe(
      map(result => {
        if (result.status === false) {
          return false;
        }
        else {
          return true;
        }
      })
    );
  }
}
