import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'purchase'
})
export class PurchasePipe implements PipeTransform {
  transform (value: number, ticketPrice: number): number {
    return value * ticketPrice;
  }
}
