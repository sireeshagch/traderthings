import * as d3 from 'd3';
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
import * as moment from 'moment';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService, PagerService, Ng4LoadingSpinnerService]
})
export class StockComponent implements OnInit {
  noSearchResults: boolean;
  stocks: Stock[] = [];
  searchResults: Stock[];
  clickedSymbol: string; displayStock: Stock;
  stock: Stock;
  pager: any = {}; // pager object
  pagedItems: Stock[]; // paged items
  minDataURL: string; // minute data URL/API
  minuteData: MinuteData;
  dailyData: MinuteData;
  metaDataInfo: string;
  metaDataLastRefreshed: string;
  metaDataInterval: string;
  metaDataTimezone: string;
  stockData: StockData = new StockData();
  isLoading = true;
  loadGIF = 'assets/img/loading.gif';
  tsData: TimeSeriesData[] = new Array<TimeSeriesData>();
  latestClose: string;
  latestTime: string;
  previousClose: string;
  difference: string;
  percentage: string;
  sign: string;
  cdata: {time: string, open: number, high: number, low: number, close: number};
  chartDataJSON = [];
  chartData = {close: [], open: [], high: [], low: [], time: []};
  chart: c3.ChartAPI;
  daysChart: c3.ChartAPI;
  xFormat_TIME = '%Y-%m-%d %H:%M:%S';
  xFormat_DAY = '%Y-%m-%d';
  format_TIME = '%m/%d/%y %H:%M';
  format_DAY = '%m/%d/%y';

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
        console.log('stock component : ' + this.clickedSymbol);
        this.stockService
          .getStocksBySymbol(this.clickedSymbol)
          .subscribe(stocksBySymbol => {
            if (stocksBySymbol.length === 0) {
              console.log('stocks 0');
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
    this.stockService.getDaysStockData('DAILY', clickedStock.Symbol).subscribe(dailyData => {
      this.dailyData = dailyData;
      let count = 0;
      const data = new TimeSeriesData();
            // tslint:disable-next-line:forin
      for (const d in this.dailyData['Time Series (Daily)']) {
        data.data = this.dailyData['Time Series (Daily)'][d];
        if (count === 1) {
          break;
        } else {
          count++;
        }
      }
      this.previousClose = data.data['4. close'];



    this.stockService.getMinuteData('1min', clickedStock.Symbol).subscribe(minuteData => {
      this.ng4LoadingSpinnerService.show();

      this.minuteData = minuteData;

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
      this.latestClose = Number(this.tsData[0].data['4. close']).toFixed(2);
      const time = new Date(this.tsData[0].time);
      this.latestTime = 'At close: ' + moment(time).format('MMM Do YYYY, h:mm a') + ' EST';

              this.difference = Number(Number(this.latestClose) - Number(this.previousClose)).toFixed(2);
              if (Math.sign(Number(this.difference)) === 1) {
                this.sign = '+';
              } else if (Math.sign(Number(this.difference)) === -1) {
                this.sign = '-';
              }
              this.percentage = '(' + this.sign +
                                Number((Number(this.difference) / Number(this.previousClose)) * 100).toFixed(2) + '%)';
              console.log('difference: ' + this.difference);
      if (this.chart === undefined) {
        this.generateChart(this.chart, this.chartDataJSON, this.xFormat_TIME, this.format_TIME);

      } else {

      this.loadChart(this.chart, this.chartDataJSON);

      }
      this.ng4LoadingSpinnerService.hide();

      this.isLoading = false;
    });
  });
  }

  generateChart(chart: c3.ChartAPI, data: any[], XFormat: string, Format: string) {
    chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'time',
        xFormat: XFormat,
        keys: {
           x: 'time',
            value: ['open', 'high', 'low', 'close'],
        },
        json: data
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            count: 50,
            culling: {
              max: 10, // the number of tick texts will be adjusted to less than this value
          },
              format: Format,
          }
        },
        y: {
          tick: {
            format: d3.format('$' + '.2f')
          //  format: function (d) { return '$' + d; }
        }
        }
      },
      tooltip: {
        format: {
          title: function(d) {return moment(d).format('MMM DD YYYY, h:mm A'); },
        }
      },
      subchart: {
        show: true,
        size: {
          height: 20
        }
      },
      padding: {
        right: 35,
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
  }

  loadChart(chart: c3.ChartAPI, data: any[]) {
    setTimeout(chart.load({
      keys: {
        x: 'time',
         value: ['open', 'high', 'low', 'close'],
     },
     json: data,
     unload: null
  }), 1000);
  }

  destroyChart(chart: c3.ChartAPI) {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  }

  fetchTimelyData(type: string) {
    let time = '';
    let str = '';
    if (type === '1m') {
      time = '1min';
      str = 'Time Series (1min)';
    } else if (type === '5m') {
      time = '5min';
      str = 'Time Series (5min)';
    } else if (type === '1d') {
      time = 'DAILY';
      str = 'Time Series (Daily)';
    } else if (type === '1w') {
      time = 'WEEKLY';
      str = 'Weekly Time Series';
    } else if (type === '1Mon') {
      time = 'MONTHLY';
      str = 'Monthly Time Series';
    }

    if (type === '1m' || type === '5m') {
      if (this.daysChart) {
        this.daysChart.destroy();
      }
      this.ng4LoadingSpinnerService.show();

      this.stockService.getMinuteData(time, this.displayStock.Symbol).subscribe(minuteData => {
        this.minuteData = minuteData;

        let j = 0;
        this.chartDataJSON = [];
        // tslint:disable-next-line:forin
        for (const i in this.minuteData[str]) {
          this.tsData[j] = new TimeSeriesData();
          this.tsData[j].time = i;
          this.tsData[j].data = this.minuteData[str][i];

          this.cdata = {time: this.tsData[j].time, open: this.tsData[j].data['1. open'],
                        high: this.tsData[j].data['2. high'], low: this.tsData[j].data['3. low'],
                        close: this.tsData[j].data['4. close']};
          this.latestClose = Number(this.tsData[0].data['4. close']).toFixed(2);
          this.chartDataJSON.unshift(this.cdata);
          j++;
        }

        if (this.chart === undefined) {
          this.generateChart(this.chart, this.chartDataJSON, this.xFormat_TIME, this.format_TIME);
        } else {
          this.loadChart(this.chart, this.chartDataJSON);
        }

    this.ng4LoadingSpinnerService.hide();

      console.log(time + ' ' + this.chartDataJSON.length);
  });
    } else if (type === '1d' || type === '1w' || type === '1Mon') {
      if (this.chart) {
        this.chart.destroy();
      }
      this.ng4LoadingSpinnerService.show();

      this.stockService.getDaysStockData(time, this.displayStock.Symbol).subscribe(minuteData => {
        this.minuteData = minuteData;

        let j = 0;
        this.chartDataJSON = [];
        // tslint:disable-next-line:forin
        for (const i in this.minuteData[str]) {
          this.tsData[j] = new TimeSeriesData();
          this.tsData[j].time = i;
          this.tsData[j].data = this.minuteData[str][i];

          this.cdata = {time: this.tsData[j].time, open: this.tsData[j].data['1. open'],
                        high: this.tsData[j].data['2. high'], low: this.tsData[j].data['3. low'],
                        close: this.tsData[j].data['4. close']};

          this.chartDataJSON.unshift(this.cdata);
          j++;
        }

        if (this.daysChart === undefined) {
          this.generateChart(this.daysChart, this.chartDataJSON, this.xFormat_DAY, this.format_DAY);
        } else {
          this.loadChart(this.daysChart, this.chartDataJSON);
        }
        this.ng4LoadingSpinnerService.hide();

        console.log(time + ' ' + this.chartDataJSON.length);
      });
    }

  }



}
