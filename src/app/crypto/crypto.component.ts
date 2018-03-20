import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import * as moment from 'moment';

import { CryptoService } from './crypto.service';
import { PagerService } from '../services/pager.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Crypto } from './crypto';
import { HomepageComponent } from '../homepage/homepage.component';
import { CryptoPriceData } from './cryptoprice';
import { TimeSeriesData } from './TimeSeriesData';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css'],
  providers: [CryptoService]
})
export class CryptoComponent implements OnInit {

  noSearchResults: boolean;
  cryptos: Crypto[] = [];
  searchResults: Crypto[];
  clickedCode: string; displayCrypto: Crypto;
  crypto: Crypto;
  pager: any = {}; // pager object
  pagedItems: Crypto[]; // paged items
  // minDataURL: string; // minute data URL/API
  // minuteData: MinuteData;
  dailyData: CryptoPriceData;
  // metaDataInfo: string;
  // metaDataLastRefreshed: string;
  // metaDataInterval: string;
  // metaDataTimezone: string;
  // stockData: StockData = new StockData();
  isLoading = true;
  // loadGIF = 'assets/img/loading.gif';
  tsData: TimeSeriesData[] = new Array<TimeSeriesData>();
  latestClose: string;
  // latestTime: string;
  previousClose: string;
  difference: string;
  percentage: string;
  sign: string;
  dailyChartData: {date: string, open: number, high: number, low: number, close: number};
  chartDataJSON = [];
  // chartData = {close: [], open: [], high: [], low: [], time: []};
  chart: c3.ChartAPI;
  // daysChart: c3.ChartAPI;
  xFormat_TIME = '%Y-%m-%d %H:%M:%S';
  xFormat_DAY = '%Y-%m-%d';
  format_TIME = '%m/%d/%y %H:%M';
  format_DAY = '%m/%d/%y';

  constructor(
    private cryptoService: CryptoService,
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
    this.pager = this.pagerService.getPager(this.cryptos.length, page, 10);

    // get current page of items
    this.pagedItems = this.cryptos.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['searchData']) {
        this.clickedCode = params['searchData'];
        console.log('crypto component : ' + this.clickedCode);
        this.cryptoService
          .getCryptoByCode(this.clickedCode)
          .subscribe(cryptosBySymbol => {
            if (cryptosBySymbol.length === 0) {
              console.log('cryptos 0');
              this.cryptoService
              .getCryptoByName(this.clickedCode.charAt(0).toUpperCase() + this.clickedCode.slice(1).toLowerCase())
              .subscribe(cryptosByName => {
                if (cryptosByName.length === 0) {
                  this.noSearchResults = true;
                } else {
                  this.cryptos = cryptosByName;
                  this.setPage(1);
                  this.noSearchResults = false;
                  if (this.cryptos.length === 1) {
                    this.fetchCryptoDetails(this.cryptos[0], 'Daily');
                  }
                }

              });
            } else {
              console.log('cryptobysymbol');
            this.cryptos = cryptosBySymbol;
            this.setPage(1);
            this.noSearchResults = false;
            if (this.cryptos.length === 1) {
              this.fetchCryptoDetails(this.cryptos[0], 'Daily');
            }
           }
          });
      } else {
        this.getAllCryptos();
      }
    });
  }
  getAllCryptos() {
    this.displayCrypto = null;
    this.cryptoService.getCryptos().subscribe(cryptos => {
      this.cryptos = cryptos;
      this.setPage(1);
    });
  }

  fetchCryptoDetails(clickedCrypto: Crypto, type: string) {
    console.log('fetch crypto details');
    this.displayCrypto = clickedCrypto;
    this.cryptoService.getTimelyCryptoData(type, clickedCrypto.code).subscribe(dailyData => {
      this.ng4LoadingSpinnerService.show();

      this.dailyData = dailyData;

      let j = 0;
      this.chartDataJSON = [];
      // tslint:disable-next-line:forin
      for (const i in this.dailyData['Time Series (Digital Currency ' + type + ')']) {
        this.tsData[j] = new TimeSeriesData();
        this.tsData[j].time = i;
        this.tsData[j].data = this.dailyData['Time Series (Digital Currency ' + type + ')'][i];

        if (j === 1) {
          this.previousClose = this.tsData[j].data['4a. close (USD)'];
        }
        this.latestClose = Number(this.tsData[0].data['4a. close (USD)']).toFixed(2);
        this.difference = Number(Number(this.latestClose) - Number(this.previousClose)).toFixed(2);
              if (Math.sign(Number(this.difference)) === 1) {
                this.sign = '+';
              } else if (Math.sign(Number(this.difference)) === -1) {
                this.sign = '-';
              }
              this.percentage = '(' + this.sign +
                                Number((Number(this.difference) / Number(this.previousClose)) * 100).toFixed(2) + '%)';

        this.dailyChartData = {date: this.tsData[j].time, open: this.tsData[j].data['1a. open (USD)'],
                      high: this.tsData[j].data['2a. high (USD)'], low: this.tsData[j].data['3a. low (USD)'],
                      close: this.tsData[j].data['4a. close (USD)']};


                      // console.log('chart data: ' + j + ' ' + this.dailyChartData.date);

        this.chartDataJSON.unshift(this.dailyChartData);
        j++;
      }
      if (this.chart === undefined) {
        this.generateChart(this.chart, this.chartDataJSON, this.xFormat_DAY, this.format_DAY);

      } else {

      this.loadChart(this.chart, this.chartDataJSON);

      }
      this.ng4LoadingSpinnerService.hide();


      this.isLoading = false;
    });
  }

  generateChart(chart: c3.ChartAPI, data: any[], XFormat: string, Format: string) {
    chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'date',
        xFormat: XFormat,
        keys: {
           x: 'date',
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
    this.fetchCryptoDetails(this.displayCrypto, type);
  }

}
