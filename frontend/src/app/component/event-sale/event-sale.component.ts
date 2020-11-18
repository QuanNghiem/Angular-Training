import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from 'src/app/_service/purchase.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-event-sale',
  templateUrl: './event-sale.component.html',
  styleUrls: ['./event-sale.component.css']
})
export class EventSaleComponent implements OnInit, OnDestroy {
  eventID;
  orderList: Purchase[] = [];
  purchaseSubscriber: Subscription;

  constructor (private _purchaseService: PurchaseService, private router: ActivatedRoute) { }

  ngOnInit (): void {
    this.router.paramMap.subscribe(params => {
      this.eventID = params.get("id");
      this.getOrders(this.eventID);
    });

  }

  getOrders (id) {
    this.purchaseSubscriber = this._purchaseService.getSales(id).subscribe(result => {
      if (result) {
        this.orderList = result;
      }
    });
  }

  exportExcel () {
    let filename = this.eventID + '.xlsx';
    let element = document.getElementById('ticket-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, filename);
  }

  ngOnDestroy () {
    if (this.purchaseSubscriber) {
      this.purchaseSubscriber.unsubscribe();
    }
  }
}
