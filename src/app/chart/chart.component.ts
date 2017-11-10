import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {


  //   const chart = c3.generate( {
  //     data: {
  //         columns: [
  //             ['close',22.36,22.36,22.36,22.36,22.36,22.36,22.67,22.5,22.67,22.74,22.6125,23.08,23.08,23.08,
  //               23.35,23.35,23.35,23.35,23.35,23.35,23.95,24,24,24.3,24.97,24.3001,27,28.26,27.24,27.3106],
  //             ['open',22.36,22.36,22.36,22.36,22.36,22.36,22.67,22.5,22.67,22.77,22.6125,23.08,23.08,23.08,
  //             23.35,23.35,23.35,23.35,23.35,23.35,23.95,24,24,24.3,24.97,25.76,27.55,27.98,27.24,27.16]
  //         ]
  //     },
  //     grid: {
  //         x: {
  //             show: true
  //         },
  //         y: {
  //             show: true
  //         }
  //     },
  //     zoom: {
  //       enabled: true
  //   }
  // });


  }

  drawChart(data: string) {

    const jsonData = JSON.parse(data);
    console.log('jsondata:' + jsonData);
    const data1 = [22.36, 24, 24, 24, 27.24];
    const data2 = [22.36, 22.67, 22.5, 22.69, 22.81];
    // ['time', jsonData['time']],
                // ['open', jsonData['open']],
                // ['high', jsonData['high']],
                // ['low', jsonData['low']],
                // ['close', jsonData['close']]
                console.log('close data' + ['close'].concat(jsonData['close']));
                console.log('open data' + ['close'].concat(jsonData['open']));

    const chart = c3.generate( {
            data: {
                json: [
                  {'time': jsonData['time']},
                  {'open': jsonData['open']},
                  {'close': jsonData['close']}
                    // ['close'].concat(jsonData['close']),
                    // ['open'].concat(jsonData['open'])
                ]

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
}
