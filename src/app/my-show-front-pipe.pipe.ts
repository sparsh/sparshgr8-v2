import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myShowFrontPipe'
})
export class MyShowFrontPipePipe implements PipeTransform {

  transform(items: Array<any>, showFront: boolean): Array<any> {
    //console.log("show front is " + showFront);
    return items.filter(item => item.showFront);

  }

}
