import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})

export class CategoryPipe implements PipeTransform {

  transform(value: string): string {

switch(value){
      case '1':   return 'check';
      case '0':   return 'block';
    }
    return 'code';
  }

}
