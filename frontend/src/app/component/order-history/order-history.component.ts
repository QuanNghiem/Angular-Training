import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from 'src/app/_service/purchase.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {

  orderList: Purchase[] = [];
  purchaseSubscriber: Subscription;

  constructor (private _purchaseService: PurchaseService) { }

  ngOnInit (): void {
    this.getOrders();
  }

  getOrders () {
    this.purchaseSubscriber = this._purchaseService.getTickets().subscribe(result => {
      if (result) {
        this.orderList = result;
      }
    });
  }

  ngOnDestroy () {
    if (this.purchaseSubscriber) {
      this.purchaseSubscriber.unsubscribe();
    }
  }
}
