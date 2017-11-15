import { Component, Input } from '@angular/core';
import {Image} from './image.interface';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StockComponent } from './stock/stock.component';
import { StockService } from './stock/stock.service';
import { PagerService } from './services/pager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StockComponent, StockService, PagerService]
})

export class AppComponent {
  searchString: string;
  isLoggedIn: Boolean= false;
  user: string;
  pswd: string;
  // User image URL
  userimg = '../assets/img/user.png';


  constructor(public authService: AuthService, private router: Router, public stockComponent: StockComponent) {
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
    this.router.navigate(['stock', {searchData: this.searchString}]);
    this.searchString = '';
  }

}

