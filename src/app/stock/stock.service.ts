import { Injectable } from '@angular/core';
import {Http,Response, RequestOptions, Headers } from '@angular/http';
import { Stock } from './stock';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class StockService {

  constructor(private http:Http) { }

  //retrieving StoclService
  getStocks()
  {
   return this.http.get('http://ec2-34-235-135-194.compute-1.amazonaws.com:3000/stocks/?limit=500')
    .map(res => res.json());
  }

  getMinuteData(api: string){
    return this.http.get(api)
    .map(res=>res.json());
  }
}



