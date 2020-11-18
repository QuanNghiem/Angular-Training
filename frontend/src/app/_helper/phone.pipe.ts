import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform (value: number): string {
    let result: string = '';
    let phoneArray: string[] = Array.from(value.toString());
    result = '(' + phoneArray[0] + phoneArray[1] + phoneArray[2] + ') - '
      + phoneArray[3] + phoneArray[4] + phoneArray[5]
      + ' - ' + phoneArray[6] + phoneArray[7] + phoneArray[8] + phoneArray[9];
    return result;
  }

}
