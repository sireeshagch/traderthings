import { Component, OnInit } from '@angular/core';
import { StockService } from './stock.service';
import { PagerService } from '../services/pager.service'
import { Router } from "@angular/router";
import { Stock } from './stock';
import { HomepageComponent } from '../homepage/homepage.component';
import {MinuteData} from './MinuteData'
import { StockData } from './StockData';
import { TimeSeriesData } from './TimeSeriesData';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService, PagerService]
})


export class StockComponent implements OnInit {

  item:string = "Stocks";
  stocks: Stock[];
  stock: Stock;
  Symbol: string;
  Name: string;
  LastSale: string;
  MarketCap: string;
  Sector: string;
  Industry: string;
  pager: any = {}; // pager object
  pagedItems: Stock[]; // paged items
  minDataURL: string // minute data URL/API
  clickedSymbol: string;
  apiKey: string = "80VEEF48E6H7Z2VC";
  minuteData: MinuteData;
  metaDataInfo: string; metaDataLastRefreshed: string; metaDataInterval: string; metaDataTimezone: string;
  stockData: StockData = new StockData;
  isLoading = true ;
  loadGIF: string = "../assets/img/loading.gif";
  tsData: TimeSeriesData[]= new Array<TimeSeriesData>();
  sum:number;

  constructor(private stockService:StockService, private pagerService: PagerService, private router: Router) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.stocks.length, page);
    // get current page of items
    this.pagedItems = this.stocks.slice(this.pager.startIndex, this.pager.endIndex + 1);


  }

  ngOnInit() {

    this.stockService.getStocks()
    .subscribe(stocks => {
    this.stocks = stocks;
    // console.log("length:"+this.restaurants.length);
    this.setPage(1);});
  }

  populateStockData(info: string, clickedSymbol: string, lastRefreshed: string, interval: string, timezone: string){
    this.stockData.info = info;
    this.stockData.symbol = clickedSymbol;
    this.stockData.lastRefreshed = lastRefreshed;
    this.stockData.interval = interval;
    this.stockData.timezone = timezone;
  }
  fetchStockDetails(clickedStock: Stock){
    this.clickedSymbol = clickedStock.Symbol;
    this.minDataURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+this.clickedSymbol+"&interval=1min&apikey="+this.apiKey;

    this.stockService.getMinuteData(this.minDataURL)
    .subscribe(minuteData => {
      this.minuteData = minuteData;
      this.metaDataInfo = this.minuteData['Meta Data']['1. Information'];
      this.metaDataLastRefreshed = this.minuteData['Meta Data']['3. Last Refreshed'];
      this.metaDataInterval = this.minuteData['Meta Data']['4. Interval'];
      this.metaDataTimezone = this.minuteData['Meta Data']['6. Time Zone'];
      this.populateStockData(this.metaDataInfo, this.clickedSymbol, this.metaDataLastRefreshed, this.metaDataInterval, this.metaDataTimezone);
      var j=0;

      for(var i in this.minuteData['Time Series (1min)']){
        this.tsData[j] = new TimeSeriesData;
        this.tsData[j].time = i;
        this.tsData[j].data = this.minuteData['Time Series (1min)'][i];
        this.sum = Number(this.tsData[j].data['1. open']) + Number(this.tsData[j].data['2. high']) + Number(this.tsData[j].data['3. low']) + Number(this.tsData[j].data['4. close'])
        this.tsData[j].mean = this.sum/4;
        console.log("mean:"+this.tsData[j].mean);
        j++;
        // console.log("key: " +i +" value: "+this.minuteData['Time Series (1min)'][i]);
      }

      this.isLoading = false;

      // console.log("clicked" +this.minuteData['Time Series (1min)']);
    })

  }

}
