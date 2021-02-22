import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): number {
    return Math.floor((new Date(value).valueOf() - Date.now())/(1000*60*60*24))
  }

}
