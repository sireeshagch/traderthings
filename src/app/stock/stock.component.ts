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


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService, PagerService, Ng4LoadingSpinnerService]
})
export class StockComponent implements OnInit {
  isInSearchMode: boolean;
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
  openArray = [];
  timeArray = [];
  array = [];
  closeArray = [];
  highArray = [];
  lowArray = [];
  meanArray = [];
  chartDataJSON: string;
  sum: number;

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
        this.isInSearchMode = params['fromSearch'];
        console.log('search mode' + this.isInSearchMode);
        this.clickedSymbol = params['searchData'];
        this.stockService
          .getStocksBySymbol(this.clickedSymbol)
          .subscribe(stocks => {
            this.stocks = stocks;
            this.setPage(1);
            this.isInSearchMode = false;
          });
      } else {
        console.log('ngoninit');
        this.stockService.getStocks().subscribe(stocks => {
          this.stocks = stocks;
          this.setPage(1);
        });
      }
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

      // tslint:disable-next-line:forin
      for (const i in this.minuteData['Time Series (1min)']) {
        this.tsData[j] = new TimeSeriesData();
        this.tsData[j].time = i;
        this.tsData[j].data = this.minuteData['Time Series (1min)'][i];
        this.sum =
          Number(this.tsData[j].data['1. open']) +
          Number(this.tsData[j].data['2. high']) +
          Number(this.tsData[j].data['3. low']) +
          Number(this.tsData[j].data['4. close']);
        this.tsData[j].mean = this.sum / 4;
        console.log('sireesha ' + this.tsData[j].time.split(' ')[1]);
        // forming chart data
        this.timeArray.push(this.tsData[j].time.split(' ')[1]);
        this.openArray.push(this.tsData[j].data['1. open']);
        this.highArray.push(this.tsData[j].data['2. high']);
        this.lowArray.push(this.tsData[j].data['3. low']);
        this.closeArray.push(this.tsData[j].data['4. close']);
        this.meanArray.push(this.tsData[j].mean + '');
        j++;
      }

      const chartData = {
        close: this.closeArray,
        open: this.openArray,
        high: this.highArray,
        low: this.lowArray,
        mean: this.meanArray,
        time: this.timeArray
      };
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['time'].concat(chartData.time),
            ['open'].concat(chartData.open),
            ['close'].concat(chartData.close),
            ['high'].concat(chartData.high),
            ['low'].concat(chartData.low),
            ['mean'].concat(chartData.mean)
          ]
        },
        axis: {
          x: {
            label: 'Time'
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
      this.isLoading = false;
      // this.ng4LoadingSpinnerService.hide();
    });
  }
}
