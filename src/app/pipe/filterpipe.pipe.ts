import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(gameData: any, currentDate: any): unknown {
    let bool = moment(gameData.value[0].MatchDate).isSame(currentDate);
    return bool;
  }
}
