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
  snpminuteData: MinuteData;
  dowMinuteData: MinuteData;
  nasdaqTSArray: TimeSeriesData[] = new Array<TimeSeriesData>();
  snpTSArray: TimeSeriesData[] = new Array<TimeSeriesData>();
  dowTSArray: TimeSeriesData[] = new Array<TimeSeriesData>();

  pager: any = {}; // pager object
  pagedItems = []; // paged items
  news: News[];
  articles = [];

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
      this.snpminuteData = snp;

      let j = 0;
      const openArray = [];
      const timeArray = [];
      const array = [];
      const closeArray = [];
      const highArray = [];
      const lowArray = [];
      const meanArray = [];
      const chartDataJSON = '';

            // tslint:disable-next-line:forin
            for (const i in this.snpminuteData['Monthly Time Series']) {
              this.snpTSArray[j] = new TimeSeriesData();
              this.snpTSArray[j].time = i;
              this.snpTSArray[j].data = this.snpminuteData['Monthly Time Series'][i];
              const sum =
                Number(this.snpTSArray[j].data['1. open']) +
                Number(this.snpTSArray[j].data['2. high']) +
                Number(this.snpTSArray[j].data['3. low']) +
                Number(this.snpTSArray[j].data['4. close']);
              this.snpTSArray[j].mean = sum / 4;
              // forming chart data
              timeArray.push(this.snpTSArray[j].time);
              openArray.push(this.snpTSArray[j].data['1. open']);
              highArray.push(this.snpTSArray[j].data['2. high']);
              lowArray.push(this.snpTSArray[j].data['3. low']);
              closeArray.push(this.snpTSArray[j].data['4. close']);
              meanArray.push(this.snpTSArray[j].mean + '');
              j++;
            }

            const chartData = {
              close: closeArray,
              open: openArray,
              high: highArray,
              low: lowArray,
              mean: meanArray,
              time: timeArray
            };

            const chart = c3.generate({
              bindto: '#chart1',
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
    });
    this.stockhomeService.getDow().subscribe(dow => {
      this.dowMinuteData = dow;

      let j = 0;
      const openArray = [];
      const timeArray = [];
      const array = [];
      const closeArray = [];
      const highArray = [];
      const lowArray = [];
      const meanArray = [];
      const chartDataJSON = '';

            // tslint:disable-next-line:forin
            for (const i in this.dowMinuteData['Monthly Time Series']) {
              this.dowTSArray[j] = new TimeSeriesData();
              this.dowTSArray[j].time = i;
              this.dowTSArray[j].data = this.dowMinuteData['Monthly Time Series'][i];
              const sum =
                Number(this.dowTSArray[j].data['1. open']) +
                Number(this.dowTSArray[j].data['2. high']) +
                Number(this.dowTSArray[j].data['3. low']) +
                Number(this.dowTSArray[j].data['4. close']);
              this.dowTSArray[j].mean = sum / 4;
              console.log('sireesha' + this.dowTSArray[j].time);
              // forming chart data
              timeArray.push(this.dowTSArray[j].time);
              openArray.push(this.dowTSArray[j].data['1. open']);
              highArray.push(this.dowTSArray[j].data['2. high']);
              lowArray.push(this.dowTSArray[j].data['3. low']);
              closeArray.push(this.dowTSArray[j].data['4. close']);
              meanArray.push(this.dowTSArray[j].mean + '');
              j++;
            }

            const chartData = {
              close: closeArray,
              open: openArray,
              high: highArray,
              low: lowArray,
              mean: meanArray,
              time: timeArray
            };

            const chart = c3.generate({
              bindto: '#chart2',
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
    });

    this.stockhomeService.getNasdaq().subscribe(nasdaq => {
      this.nasdaqMinuteData = nasdaq;

      let j = 0;
      const openArray = [];
      const timeArray = [];
      const array = [];
      const closeArray = [];
      const highArray = [];
      const lowArray = [];
      const meanArray = [];
      const chartDataJSON = '';
            // tslint:disable-next-line:forin
            for (const i in this.nasdaqMinuteData['Time Series (1min)']) {
              this.nasdaqTSArray[j] = new TimeSeriesData();
              this.nasdaqTSArray[j].time = i;
              this.nasdaqTSArray[j].data = this.nasdaqMinuteData['Time Series (1min)'][i];
              const sum =
                Number(this.nasdaqTSArray[j].data['1. open']) +
                Number(this.nasdaqTSArray[j].data['2. high']) +
                Number(this.nasdaqTSArray[j].data['3. low']) +
                Number(this.nasdaqTSArray[j].data['4. close']);
              this.nasdaqTSArray[j].mean = sum / 4;

              // forming chart data
              timeArray.push(this.nasdaqTSArray[j].time.split(' ')[1]);
              openArray.push(this.nasdaqTSArray[j].data['1. open']);
              highArray.push(this.nasdaqTSArray[j].data['2. high']);
              lowArray.push(this.nasdaqTSArray[j].data['3. low']);
              closeArray.push(this.nasdaqTSArray[j].data['4. close']);
              meanArray.push(this.nasdaqTSArray[j].mean + '');
              j++;
            }

            const chartData = {
              close: closeArray,
              open: openArray,
              high: highArray,
              low: lowArray,
              mean: meanArray,
              time: timeArray
            };

            const chart = c3.generate({
              bindto: '#chart3',
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

  drawChart(data: any[]) {

  }

}
