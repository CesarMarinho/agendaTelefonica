import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favorite'
})
export class FavoritePipe implements PipeTransform {

  transform(value: boolean): string {
    if (value) return 'favorite';
    return '';
  }

}
