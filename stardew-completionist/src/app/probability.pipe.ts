import { Pipe, PipeTransform } from '@angular/core';
import { KeyValue } from '@angular/common';

@Pipe({
  name: 'probability'
})
export class ProbabilityPipe implements PipeTransform {
  transform(value: KeyValue<string, number>, ...args: unknown[]): unknown {
    return `${value.key} (${value.value * 100}%)`;
  }

}
