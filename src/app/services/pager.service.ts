import * as _ from 'lodash';
import { Injectable } from '@angular/core';
@Injectable()
export class PagerService {


    getPager(totalItems: number, currentPage: number, pageSize: number = 10) {
      let testString: string="nothing";
      // calculate total pages
        testString = "entered function";
        let totalPages = Math.ceil(totalItems / pageSize);
        testString = "executing...";
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        testString = "before underscore---working";
        // create an array of pages to ng-repeat in the pager control
       let pages = _.range(startPage, endPage + 1);
        //let pages = Array.from(Array(endPage - startPage), (_, i) => startPage + i)
        testString = "after underscore---working";

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages,
            testString: testString
        };
    }
}
