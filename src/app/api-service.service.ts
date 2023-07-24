import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> }

  constructor(private httpClient: HttpClient) { }
  ListOfGame() {
    return this.httpClient.get('http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1')
  }

  selectionLeg() {
    return this.httpClient.get('http://cms.bettorlogic.com/api/BetBuilder/GetSelections?sports=1')
  }

  MarketApi() {
    return this.httpClient.get('http://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1')
  }

  BetBuilderBets(matchId: any, marketId: any, LegId: any) {
    let params = new HttpParams();
    params = params.append('sports', 1);
    params = params.append('matchId', matchId);
    params = params.append('marketId', marketId);
    params = params.append('legs', LegId);
    params = params.append('language', 'en');
    console.log(marketId, LegId);
    return this.httpClient.get('http://cms.bettorlogic.com/api/BetBuilder/GetBetBuilderBets', { params: params })
  }
}
