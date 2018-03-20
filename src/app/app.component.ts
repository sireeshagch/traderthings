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
import { CryptoService } from './crypto/crypto.service';
import { CodesNames } from './CodesNames';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StockComponent, StockService, PagerService, CryptoService],
})


export class AppComponent {
  searchString: string;
  isCryptoPage = false;
  arrowSelectedString = '';
  isLoggedIn: Boolean= false;
  user: string;
  pswd: string;
  // User image URL
  userimg = '../assets/img/user.png';
  symbolsnames: SymbolsNames[] = [];
  codesnames: CodesNames[] = [];
  symbols = [];
  codes = [];
public filteredStockList = [];
public filteredCryptoList = [];
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
    private stockService: StockService, private cryptoService: CryptoService,
     public stockComponent: StockComponent, private myElement: ElementRef) {
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

    this.cryptoService.getCryptos().subscribe(codesNames => {
      this.codesnames = codesNames;
      this.codesnames.sort(function(a, b){
        const codeA = a.code.toLowerCase(), codeB = b.code.toLowerCase();
        if (codeA < codeB) {
         return -1;
        }
        if (codeA > codeB) {
         return 1;
        }
        return 0;
       });
      for (let i = 0; i < this.codesnames.length; i++) {
        this.codes[i] = this.codesnames[i].code;
      }
    });
    this.selectedIdx = 0;
  }

  navigateToStock() {
    this.router.navigate(['stock']);
  }
  navigateToCrypto() {
    this.isCryptoPage = true;
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
  navigateToSignup() {
    $('#modal-close-btn').click();
    this.router.navigate(['signup']);
  }

  login() {
    console.log('singin with google');
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
      if (this.selectedIdx >= this.filteredStockList.length) {
        this.searchString = this.filteredCryptoList[this.selectedIdx - this.filteredStockList.length].code;
        this.router.navigate(['crypto', {searchData: this.searchString}]);

      } else {
        this.searchString = this.filteredStockList[this.selectedIdx].Symbol;
        this.router.navigate(['stock', {searchData: this.searchString}]);

      }
    }
    this.searchString = '';
    this.selectedIdx = 0;

  }
  filter(event: any) {
    if (this.searchString !== '') {
      if (event.code === 'ArrowDown' && this.selectedIdx < this.filteredStockList.length + this.filteredCryptoList.length ) {
        this.selectedIdx++;
        if (this.selectedIdx > this.filteredStockList.length + this.filteredCryptoList.length) {
        }
        console.log('filter :' +       this.selectedIdx);

        if (this.selectedIdx >= this.filteredStockList.length) {
          this.arrowSelectedString = this.filteredCryptoList[this.selectedIdx - this.filteredStockList.length].code;
        } else {
         this.arrowSelectedString = this.filteredStockList[this.selectedIdx].Symbol;
        }
        console.log('arrowSelected String: ' + this.arrowSelectedString);
    } else if (event.code === 'ArrowUp' && this.selectedIdx > 0) {
        this.selectedIdx--;
    }
        this.filteredStockList = this.symbolsnames.filter(function(el){
            return (el.Symbol.toLowerCase().substring(0, this.searchString.length) === this.searchString.toLowerCase()) ||
            (el.Name.toLowerCase().substring(0, this.searchString.length) === this.searchString.toLowerCase()) ;
        }.bind(this)).slice(0, 9);
        console.log('filtered stock list :' +       this.filteredStockList.length);

        this.filteredCryptoList = this.codesnames.filter(function(el){
          return (el.code.toLowerCase().substring(0, this.searchString.length) === this.searchString.toLowerCase()) ||
          (el.name.toLowerCase().substring(0, this.searchString.length) === this.searchString.toLowerCase()) ;
      }.bind(this)).slice(0, 9);
        console.log('filtered crypto list :' +       this.filteredCryptoList.length);

        this.filteredList = [{'Stocks': this.filteredStockList}, {'Crypto Currencies': this.filteredCryptoList}];
    } else {
        this.filteredStockList = [];
        this.filteredCryptoList = [];
        this.filteredList = [];
    }
}


selectStock(item, idx) {
    this.searchString = item.Symbol;
    this.selectedIdx = idx;
    console.log('selectStock: ' + this.searchString);
    this.searchStock();
    this.filteredStockList = [];
    this.selectedIdx = -1;
}
selectCrypto(item, idx) {
  this.searchString = item.code;
  this.selectedIdx = idx;
  console.log('selectCrypto: ' + this.searchString);

  this.searchStock();
  this.filteredCryptoList = [];
  this.selectedIdx = -1;

}
handleBlur() {
  setTimeout(
    this.blur(), 2000);
}
blur() {
  if (this.selectedIdx > -1) {
      this.searchString = this.filteredStockList[this.selectedIdx];
  }
  this.filteredStockList = [];
  this.filteredCryptoList = [];
  this.filteredList = [];
  this.selectedIdx = -1;
}


}

