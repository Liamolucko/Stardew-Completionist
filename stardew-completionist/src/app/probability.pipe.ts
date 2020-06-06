import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'probability'
})
export class ProbabilityPipe implements PipeTransform {
  transform(value: KeyValue<string, number>): unknown {
    return `${value.key} (${value.value * 100}%)`;
  }

}
