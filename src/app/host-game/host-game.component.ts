import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-host-game',
  templateUrl: './host-game.component.html',
  styleUrls: ['./host-game.component.css']
})
export class HostGameComponent {
  selectionApiData: any;
  marketApiData: any;
  selectionLeg: any = "";
  selectedMarket: any = "";
  matchId: any;
  BetBuilderBetsApiCall: any;
  BetBuilderBetsApiData: any;
  routeState: any;
  TotalOdds: any;

  constructor(private router: Router, private apiService: ApiServiceService) {

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.routeState = this.router.getCurrentNavigation()?.extras.state;
      if (this.routeState) {
        this.matchId = this.routeState.MatchId;
      }
    }
  }

  ngOnInit(): void {
    this.selectionLegApi();
    this.MarketeApi();
  }

  selectionLegApi() {
    this.apiService.selectionLeg().subscribe(
      (data: any) => {
        this.selectionApiData = data;
        this.selectionLeg = data[0].selectionId;
      },
      (err: any) => { console.log("error in product api"); }
    )
  }

  MarketeApi() {
    this.apiService.MarketApi().subscribe(
      (data: any) => {
        this.marketApiData = data;
        this.selectedMarket = data[0].MarketId;
        console.log(this.selectedMarket);
      },
      (err: any) => { console.log("error in product api"); }
    )

  }

  onDropdownChangeMarket(e: any) {
    this.selectedMarket = e;
    this.BetBuilderBetsApi();
  }

  onDropdownChangeLeg(e: any) {
    this.selectionLeg = e;
    this.BetBuilderBetsApi();
  }

  BetBuilderBetsApi() {
    this.apiService.BetBuilderBets(this.matchId, this.selectedMarket, this.selectionLeg).subscribe(
      (data: any) => {
        this.BetBuilderBetsApiCall = data;
        this.TotalOdds = this.BetBuilderBetsApiCall.TotalOdds
        this.BetBuilderBetsApiData = this.BetBuilderBetsApiCall.BetBuilderSelections;
        console.log(this.BetBuilderBetsApiData)
      },
      (err: any) => { console.log("error in product api"); }
    )

  }
}
