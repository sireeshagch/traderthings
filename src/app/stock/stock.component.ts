import { Component, OnInit } from '@angular/core';
import { StockService } from './stock.service';
import { PagerService } from '../services/pager.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Stock } from './stock';
import { HomepageComponent } from '../homepage/homepage.component';
import { MinuteData } from './MinuteData';
import { StockData } from './StockData';
import { TimeSeriesData } from './TimeSeriesData';
import * as c3 from 'c3';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { TestBed } from '@angular/core/testing';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService, PagerService, Ng4LoadingSpinnerService]
})
export class StockComponent implements OnInit {
  noSearchResults: boolean;
  stocks: Stock[];
  searchResults: Stock[];
  clickedSymbol: string; displayStock: Stock;
  stock: Stock;
  pager: any = {}; // pager object
  pagedItems: Stock[]; // paged items
  minDataURL: string; // minute data URL/API
  minuteData: MinuteData;
  metaDataInfo: string;
  metaDataLastRefreshed: string;
  metaDataInterval: string;
  metaDataTimezone: string;
  stockData: StockData = new StockData();
  isLoading = true;
  loadGIF = 'assets/img/loading.gif';
  tsData: TimeSeriesData[] = new Array<TimeSeriesData>();

  cdata: {time: string, open: number, high: number, low: number, close: number};
  chartDataJSON = [];
  chartData = {close: [], open: [], high: [], low: [], time: []};
  chart: c3.ChartAPI;

  constructor(
    private stockService: StockService,
    private pagerService: PagerService,
    private router: Router,
    private route: ActivatedRoute,
    private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
  ) {}

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.stocks.length, page, 10);

    // get current page of items
    this.pagedItems = this.stocks.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnInit() {
    // if (!this.isInSearchMode) {
    this.route.params.subscribe(params => {
      if (params['searchData']) {
        this.clickedSymbol = params['searchData'];
        this.stockService
          .getStocksBySymbol(this.clickedSymbol)
          .subscribe(stocksBySymbol => {
            if (stocksBySymbol.length === 0) {
              this.stockService
              .getStocksByName(this.clickedSymbol.charAt(0).toUpperCase() + this.clickedSymbol.slice(1).toLowerCase())
              .subscribe(stocksByName => {
                if (stocksByName.length === 0) {
                  this.noSearchResults = true;
                } else {
                  this.stocks = stocksByName;
                  this.setPage(1);
                  this.noSearchResults = false;
                  if (this.stocks.length === 1) {
                    this.fetchStockDetails(this.stocks[0]);
                  }
                }

              });
            } else {
            this.stocks = stocksBySymbol;
            this.setPage(1);
            this.noSearchResults = false;
            if (this.stocks.length === 1) {
              this.fetchStockDetails(this.stocks[0]);
            }
           }
          });
      } else {
        this.getAllStocks();
      }
    });
  }

  getAllStocks() {
    this.displayStock = null;
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
      this.setPage(1);
    });
  }
  populateStockData(
    info: string,
    clickedSymbol: string,
    lastRefreshed: string,
    interval: string,
    timezone: string
  ) {
    this.stockData.info = info;
    this.stockData.symbol = clickedSymbol;
    this.stockData.lastRefreshed = lastRefreshed;
    this.stockData.interval = interval;
    this.stockData.timezone = timezone;
  }

  fetchStockDetails(clickedStock: Stock) {
    this.displayStock = clickedStock;
    this.ng4LoadingSpinnerService.show();
    this.stockService.getMinuteData(clickedStock.Symbol).subscribe(minuteData => {
      this.minuteData = minuteData;
      // this.metaDataInfo = this.minuteData['Meta Data']['1. Information'] + '';
      // this.metaDataLastRefreshed = this.minuteData['Meta Data']['3. Last Refreshed'];
      // this.metaDataInterval = this.minuteData['Meta Data']['4. Interval'];
      // this.metaDataTimezone = this.minuteData['Meta Data']['6. Time Zone'];
      // this.populateStockData(this.metaDataInfo, this.clickedSymbol,
      //   this.metaDataLastRefreshed, this.metaDataInterval,
      //   this.metaDataTimezone);

      let j = 0;
      this.chartDataJSON = [];
      // tslint:disable-next-line:forin
      for (const i in this.minuteData['Time Series (1min)']) {
        this.tsData[j] = new TimeSeriesData();
        this.tsData[j].time = i;
        this.tsData[j].data = this.minuteData['Time Series (1min)'][i];

        this.cdata = {time: this.tsData[j].time, open: this.tsData[j].data['1. open'],
                      high: this.tsData[j].data['2. high'], low: this.tsData[j].data['3. low'],
                      close: this.tsData[j].data['4. close']};
        this.chartDataJSON.unshift(this.cdata);
        j++;
      }

      if (this.chart === undefined) {
        this.chart = c3.generate({
          bindto: '#chart',
          data: {
            x: 'time',
            xFormat: '%Y-%m-%d %H:%M:%S',
            keys: {
               x: 'time',
                value: ['open', 'high', 'low', 'close'],
            },
            json: this.chartDataJSON

          },
          axis: {
            x: {
              label: 'Time',
              type: 'timeseries',
              tick: {
                  format: '%m/%d/%y %H:%M'
              }
            },
            y: {
              label: 'Data'
            }
          },
          grid: {
            x: {
              show: true
            },
            y: {
              show: true
            }
          },
          zoom: {
            enabled: true
          }

        });
      } else {
        console.log('not undefined');
        console.log(this.chartDataJSON);
        this.chart.load({
          keys: {
            x: 'time',
             value: ['open', 'high', 'low', 'close'],
         },
         json: this.chartDataJSON,
         unload: null
      });
      }

      this.isLoading = false;
      this.ng4LoadingSpinnerService.hide();
    });
  }

}
