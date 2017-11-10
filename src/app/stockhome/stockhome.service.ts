import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import { TimeSeriesData } from '../stock/TimeSeriesData';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StockHomeService {

  constructor(private http: Http) { }

  getNasdaq() {
   return this.http.get('http://cheesepy.com/stockprice/TIME_SERIES_INTRADAY/1min/%5EIXIC')
    .map(res => res.json());
  }

  getSnP() {
    return this.http.get('http://cheesepy.com/stockprice/TIME_SERIES_MONTHLY/1/%5EGSPC')
     .map(res => res.json());
   }

   getDow() {
    return this.http.get('http://cheesepy.com/stockprice/TIME_SERIES_MONTHLY/1/%5EDJI')
     .map(res => res.json());
   }

   getNews() {
     return  this.http.get('https://newsapi.org/v1/articles?source=financial-times&sortBy=latest&apiKey=306de7eed4074f128a334a4cefef1881')
      .map(res => res.json());
   }
   getPopularNews() {
    return  this.http.get('https://newsapi.org/v1/articles?source=financial-times&sortBy=latest&apiKey=306de7eed4074f128a334a4cefef1881')
     .map(res => res.json());
  }
  getTopNews() {
    return  this.http.get('https://newsapi.org/v1/articles?source=financial-times&sortBy=top&apiKey=306de7eed4074f128a334a4cefef1881')
    .map(res => res.json());
  }
}



