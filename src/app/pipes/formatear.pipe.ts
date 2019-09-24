import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatear'
})

export class Formatear implements PipeTransform {
  transform(value: number | string, locale?: string){
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2
    }).format(Number(value));
  }
}
