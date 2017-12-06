import { Component, Input, HostListener } from '@angular/core';
import {Image} from './image.interface';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StockComponent } from './stock/stock.component';
import { StockService } from './stock/stock.service';
import { PagerService } from './services/pager.service';
import { ElementRef } from '@angular/core';
import { SymbolsNames } from './SymbolsNames';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StockComponent, StockService, PagerService],
})


export class AppComponent {
  searchString: string;
  arrowSelectedString = '';
  isLoggedIn: Boolean= false;
  user: string;
  pswd: string;
  // User image URL
  userimg = '../assets/img/user.png';
  symbolsnames: SymbolsNames[] = [];
  symbols = [];
public filteredList = [];
public elementRef;
selectedIdx: number;

@HostListener('document:click', ['$event'])
clickout(event) {
  if (event.target.id !== 'autoSuggestDiv' && event.target.id !== 'searchInput') {  // if click is not in 'mydiv'
  $('#autoSuggestDiv').hide(200);
  // if (this.selectedIdx > -1) {
  //   this.searchString = this.filteredList[this.selectedIdx].Symbol;
  // }
}
$( document ).on( 'keydown', function ( e ) {
  if ( e.keyCode === 27 ) { // ESC
      $('#autoSuggestDiv').hide();
  }
});
}
  constructor(public authService: AuthService, private router: Router,
    private stockService: StockService, public stockComponent: StockComponent, private myElement: ElementRef) {
    this.authService.afAuth.authState.subscribe((auth) => {
      if (auth == null) {
        this.isLoggedIn = false;
        this.router.navigate(['home']);
        console.log('Failed : ' + this.isLoggedIn);
      } else {
        this.isLoggedIn = true;
        this.router.navigate(['home']);
        console.log('Logged in : ' + this.isLoggedIn);
      }
    });
    // this.elementRef = myElement;
    // retrieve auto suggest data
    this.stockService.getSymbolAndName().subscribe(symbolsNames => {
      this.symbolsnames = symbolsNames;
      this.symbolsnames.sort(function(a, b){
        const symA = a.Symbol.toLowerCase(), symB = b.Symbol.toLowerCase();
        if (symA < symB) {
         return -1;
        }
        if (symA > symB) {
         return 1;
        }
        return 0;
       });
      for (let i = 0; i < this.symbolsnames.length; i++) {
        this.symbols[i] = this.symbolsnames[i].Symbol;
      }
    });
    this.selectedIdx = 0;
  }

  navigateToStock() {
    this.router.navigate(['stock']);
  }
  navigateToCrypto() {
    this.router.navigate(['crypto']);
  }
  navigateToRules() {
    this.router.navigate(['rules']);
  }
  navigateToHome() {
    this.router.navigate(['home']);
  }
  navigateToStockHome() {
    this.router.navigate(['stockhome']);
  }

  login() {
    this.authService.loginWithGoogle().then((data) => {
      this.router.navigate(['home']);
    });
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['home']);
  }

  onSubmit() {
    console.log(this.user + ' ' + this.pswd);
  }

  searchStock() {
    if (this.selectedIdx > -1) {
    this.searchString = this.filteredList[this.selectedIdx].Symbol;
    }
    this.router.navigate(['stock', {searchData: this.searchString}]);
    this.searchString = '';
    this.selectedIdx = 0;

  }
  filter(event: any) {
    if (this.searchString !== '') {
      if (event.code === 'ArrowDown' && this.selectedIdx < this.filteredList.length) {
        this.selectedIdx++;
        if (this.selectedIdx > this.filteredList.length) {
        }
        console.log('filter :' +       this.selectedIdx);

         this.arrowSelectedString = this.filteredList[this.selectedIdx].Symbol;
    } else if (event.code === 'ArrowUp' && this.selectedIdx > 0) {
        this.selectedIdx--;
    }
        this.filteredList = this.symbolsnames.filter(function(el){
            return (el.Symbol.toLowerCase().substring(0, this.searchString.length) === this.searchString.toLowerCase()) ||
            (el.Name.toLowerCase().substring(0, this.searchString.length) === this.searchString.toLowerCase()) ;
        }.bind(this)).slice(0, 9);
        console.log('filtered list :' +       this.filteredList.length);


    } else {
        this.filteredList = [];
    }
}


selectItem(item) {
    this.searchString = item.Symbol;
    this.filteredList = [];
    this.selectedIdx = -1;
    this.searchStock();
}
handleBlur() {
  setTimeout(
    this.blur(), 2000);
}
blur() {
  if (this.selectedIdx > -1) {
      this.searchString = this.filteredList[this.selectedIdx];
  }
  this.filteredList = [];
  this.selectedIdx = -1;
}


}

