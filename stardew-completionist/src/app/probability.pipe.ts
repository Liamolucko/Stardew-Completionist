import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'probability'
})
export class ProbabilityPipe implements PipeTransform {
  transform(value: [string, number], ...args: unknown[]): unknown {
    return `${value[0]} (${value[1] * 100}%)`;
  }

}
