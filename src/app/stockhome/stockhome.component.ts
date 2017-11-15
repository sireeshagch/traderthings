import { Component, OnInit } from '@angular/core';
import { StockHomeService } from './stockhome.service';
import { TimeSeriesData } from '../stock/TimeSeriesData';
import { MinuteData } from '../stock/MinuteData';
import * as c3 from 'c3';
import { News } from './news';
import { PagerService } from '../services/pager.service';


@Component({
  selector: 'app-stockhome',
  templateUrl: './stockhome.component.html',
  styleUrls: ['./stockhome.component.css'],
  providers: [StockHomeService, PagerService]
})
export class StockhomeComponent implements OnInit {

  nasdaqMinuteData: MinuteData;
  snpMonthlyData: MinuteData;
  dowMonthlyData: MinuteData;
  nasdaqTSArray: TimeSeriesData[] = new Array<TimeSeriesData>();
  snpTSArray: TimeSeriesData[] = new Array<TimeSeriesData>();
  dowTSArray: TimeSeriesData[] = new Array<TimeSeriesData>();
  latestClose = [];
  prevClose = [];
  chartData = {close: [], open: [], high: [], low: [], time: []};

  pager: any = {}; // pager object
  pagedItems = []; // paged items
  news: News[];
  articles = [];
  schart: c3.ChartAPI;
  dchart: c3.ChartAPI;
  nchart: c3.ChartAPI;

  constructor(private stockhomeService: StockHomeService, private pagerService: PagerService) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.articles.length, page, 7);

    // get current page of items
    this.pagedItems = this.articles.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnInit() {
    this.stockhomeService.getSnP().subscribe(snp => {
      this.snpMonthlyData = snp;

      let j = 0;
      let cdata: {time: string, open: number, high: number, low: number, close: number};
      const chartDataJSON = [];
            // tslint:disable-next-line:forin
            for (const i in this.snpMonthlyData['Time Series (Daily)']) {
              this.snpTSArray[j] = new TimeSeriesData();
              this.snpTSArray[j].time = i;
              this.snpTSArray[j].data = this.snpMonthlyData['Time Series (Daily)'][i];

              cdata = {time: this.snpTSArray[j].time, open: this.snpTSArray[j].data['1. open'],
              high: this.snpTSArray[j].data['2. high'], low: this.snpTSArray[j].data['3. low'],
              close: this.snpTSArray[j].data['4. close']};
              chartDataJSON.unshift(cdata);
              j++;
            }
            // this.latestClose[0] = this.snpTSArray[0].data['4. close'];
            // this.prevClose[0] = this.snpTSArray[1].data['4. close'];

            setTimeout(this.drawTimeChart('#chart1', chartDataJSON, this.schart), 1000);


    });
    this.stockhomeService.getDow().subscribe(dow => {
      this.dowMonthlyData = dow;

      let j = 0;
      let cdata: {time: string, open: number, high: number, low: number, close: number};
      const chartDataJSON = [];
            // tslint:disable-next-line:forin
            for (const i in this.dowMonthlyData['Time Series (Daily)']) {
              this.dowTSArray[j] = new TimeSeriesData();
              this.dowTSArray[j].time = i;
              this.dowTSArray[j].data = this.dowMonthlyData['Time Series (Daily)'][i];

              cdata = {time: this.dowTSArray[j].time, open: this.dowTSArray[j].data['1. open'],
              high: this.dowTSArray[j].data['2. high'], low: this.dowTSArray[j].data['3. low'],
              close: this.dowTSArray[j].data['4. close']};
              chartDataJSON.unshift(cdata);
              console.log('dow dates: ' + chartDataJSON[j].time);

              j++;
            }
            this.latestClose[1] = this.dowTSArray[0].data['4. close'];
            this.prevClose[1] = this.dowTSArray[1].data['4. close'];

            this.drawTimeChart('#chart2', chartDataJSON, this.dchart);
    });


    this.stockhomeService.getNasdaq().subscribe(nasdaq => {
      this.nasdaqMinuteData = nasdaq;

      let j = 0;
      let cdata: {time: string, open: number, high: number, low: number, close: number};
      const chartDataJSON = [];
            // tslint:disable-next-line:forin
            for (const i in this.nasdaqMinuteData['Time Series (Daily)']) {
              this.nasdaqTSArray[j] = new TimeSeriesData();
              this.nasdaqTSArray[j].time = i;
              this.nasdaqTSArray[j].data = this.nasdaqMinuteData['Time Series (Daily)'][i];

              cdata = {time: this.nasdaqTSArray[j].time, open: this.nasdaqTSArray[j].data['1. open'],
              high: this.nasdaqTSArray[j].data['2. high'], low: this.nasdaqTSArray[j].data['3. low'],
              close: this.nasdaqTSArray[j].data['4. close']};
              chartDataJSON.unshift(cdata);
              j++;
            }
            // console.log('nasdaq chartJSON:' + chartDataJSON[0]['time']);
            // this.latestClose[2] = this.nasdaqTSArray[0].data['4. close'];
            // this.prevClose[2] = this.nasdaqTSArray[1].data['4. close'];

            this.drawTimeChart('#chart3', chartDataJSON, this.nchart);


    this.getNews();

    });
  }
  getNews() {
  this.stockhomeService.getNews()
  .subscribe(news => {
    this.news = news;
    this.articles = news.articles;
    console.log('news length: ' + this.articles.length);
    console.log('news: ' + this.news);
    this.setPage(1);
  });
  }

  getTopNews() {
    this.stockhomeService.getTopNews()
    .subscribe(news => {
      this.news = news;
      this.articles = news.articles;
      this.setPage(1);
    });
  }

  getPopularNews() {
    this.stockhomeService.getNews()
    .subscribe(news => {
      this.news = news;
      this.articles = news.articles;
      this.setPage(1);
    });
  }

  drawTimeChart(id: string, chartDataJSON: any[], chart: c3.ChartAPI) {
    if (chart === undefined) {
      chart = c3.generate({
       bindto: id,
       data: {
         x: 'time',
         xFormat: '%Y-%m-%d',
         keys: {
            x: 'time',
             value: ['open', 'high', 'low', 'close'],
         },
         json: chartDataJSON

       },
       axis: {
         x: {
           label: 'Time',
           type: 'timeseries',
           tick: {
               format: '%m/%d/%y',
           }
         },
         y: {
           label: 'Data'
         }
       },
       padding: {
        right: 20,
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
     chart.load({
       keys: {
         x: 'time',
          value: ['open', 'high', 'low', 'close'],
      },
      json: chartDataJSON,
      unload: null
   });
       }
  }

}
