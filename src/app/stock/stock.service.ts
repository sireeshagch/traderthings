import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import { Stock } from './stock';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StockService {

  constructor(private http: Http) { }

  // retrieving StoclService
  getStocks() {
   return this.http.get('http://www.cheesepy.com/stocks/?limit=500')
    .map(res => res.json());
  }

  getMinuteData(clickedSymbol: string) {
    const url = 'http://cheesepy.com/stockprice/TIME_SERIES_INTRADAY/1min/' + clickedSymbol;
    return this.http.get(url)
    .map(res => res.json());
  }

  getStocksBySymbol(symbol: string) {
    return this.http.get('http://www.cheesepy.com/stocks/?Symbol__regex=/^' + symbol + '/i')
    .map(res => res.json());
  }

}



