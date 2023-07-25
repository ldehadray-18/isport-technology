import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiServiceService } from '../api-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  Todaydate: any;
  arrayGame: any = [];
  GameList: any;
  groupedDateCountry: { [key: string]: any[] } = {};
  currentDateTime: any;
  currentDate: any;
  selectedDate: any;
  constructor(private apiService: ApiServiceService, public datepipe: DatePipe) { }
  ngOnInit(): void {
    for (let i = 0; i < 7; i++) {
      this.Todaydate = new Date();
      this.Todaydate.setDate(this.Todaydate.getDate() + (i));
      this.arrayGame[i] = this.Todaydate;
    }
    this.Todaydate = new Date();
    this.currentDate = this.datepipe.transform(this.Todaydate, 'M/d/yyyy');
    this.selectedDate = this.datepipe.transform(this.Todaydate, 'EE d MMMM');
    console.log(this.selectedDate);
    this.getAllProduct();
  }

  getAllProduct() {
    this.apiService.ListOfGame().subscribe(
      (data: any) => {
        this.GameList = data;
        this.GameList = this.GameList.sort((a: any, b: any) => {
          return (a.KickOffUtc) - (b.KickOffUtc);
        });
        this.groupedDateCountry = this.GameList.reduce((group: any, current: any) => {
          const groupingKeyDateCountry = `${current.Country} ${current.LeagueName} - ${current.MatchDate}`;
          group[groupingKeyDateCountry] = group[groupingKeyDateCountry] || [];
          group[groupingKeyDateCountry].push(current);
          return group;
        }, {});
      },
      (err: any) => { console.log("error in product api"); }
    )
  }

  selectDate(matchDate: any) {
    console.log(matchDate);
    this.currentDate = this.datepipe.transform(matchDate, 'M/d/yyyy');
    this.selectedDate = this.datepipe.transform(matchDate, 'EE d MMMM');
  }

  checkSelectedDateColor(matchDate: any) {
    if (this.selectedDate == matchDate) {
      return true;
    }
    return false;
  }
}
