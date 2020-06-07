import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string): string {
    const time = parseInt(value, 10);
    const hour = (time % 1200 + (time % 1200 === 0 ? 1200 : 0)).toString();
    const half = Math.floor(time / 1200) % 2 === 0 ? 'AM' : 'PM';

    return `${hour.slice(0, -2)}:${hour.slice(-2)}${half}`;
  }

}
