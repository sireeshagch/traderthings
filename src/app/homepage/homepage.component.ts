import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // image URLs
  carousel1 = 'assets/img/markets.jpg';
  carousel2 = 'assets/img/stock.jpg';
  carousel3 = 'assets/img/bit.jpg';
  rules = 'assets/img/rules.jpg';
  bitcoin = 'assets/img/bitcoin-thumb.jpg';
  stock = 'assets/img/stocktrends.jpg';

  constructor(private router: Router) { }

  ngOnInit() {
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
  public navigateToHome() {
    this.router.navigate(['home']);
  }
}
