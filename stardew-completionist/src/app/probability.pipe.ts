import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'probability'
})
export class ProbabilityPipe implements PipeTransform {
  transform(value: KeyValue<string, number>): string {
    return `${value.key} (${Math.round((value.value + Number.EPSILON) * 10000000) / 100000}%)`;
  }

}
