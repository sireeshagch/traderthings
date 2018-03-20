import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import { Crypto } from './crypto';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CryptoService {

  constructor(private http: Http) { }

  getCryptos() {
    return this.http.get('https://cheesepy.com/cryptocurrency')
     .map(res => res.json());
   }

   getCryptoByCode(code: string) {
    return this.http.get('https://cheesepy.com/cryptocurrency/?code=' + code)
    .map(res => res.json());
  }

  getCryptoByName(name: string) {
    return this.http.get('https://cheesepy.com/cryptocurrency/?name__regex=/^' + name + '/')
    .map(res => res.json());
  }

  getTimelyCryptoData(time: string, clickedCode: string) {
    const url = 'https://cheesepy.com/currencyprice/' + time + '/' + clickedCode + '/USD';
    return this.http.get(url)
    .map(res => res.json());
  }
}
