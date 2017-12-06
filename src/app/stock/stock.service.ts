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
   return this.http.get('https://www.cheesepy.com/stocks/?limit=500')
    .map(res => res.json());
  }

  getSymbolAndName() {
    return this.http.get('https://www.cheesepy.com/stocks/?select=Symbol%20Name')
    .map(res => res.json());
  }

  getMinuteData(time: string, clickedSymbol: string) {
    const url = 'https://cheesepy.com/stockprice/TIME_SERIES_INTRADAY/' + time + '/' + clickedSymbol;
    return this.http.get(url)
    .map(res => res.json());
  }

  getDaysStockData(type: string, clickedSymbol: string) {
    const url = 'http://cheesepy.com/stockprice/TIME_SERIES_' + type + '/1/' + clickedSymbol;
    return this.http.get(url)
    .map(res => res.json());
  }

  getStocksBySymbol(symbol: string) {
    return this.http.get('https://www.cheesepy.com/stocks/?Symbol=' + symbol)
    .map(res => res.json());
  }

  getStocksByName(name: string) {
    return this.http.get('https://cheesepy.com/stocks/?Name__regex=/^' + name + '/')
    .map(res => res.json());
  }
}



