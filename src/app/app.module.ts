import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Http, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponents, AppRoutes } from './app.routing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {TabModule} from 'angular-tabs-component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';


import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StockComponent } from './stock/stock.component';
import { CryptoComponent } from './crypto/crypto.component';
import { RulesComponent } from './rules/rules.component';
import { StockhomeComponent } from './stockhome/stockhome.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyBs1YSjLC267dDVMm3hj8SwB4oDE5Hv41I',
  authDomain: 'stockoverflow-7a0a5.firebaseapp.com',
  databaseURL: 'https://stockoverflow-7a0a5.firebaseio.com',
  projectId: 'stockoverflow-7a0a5',
  storageBucket: 'stockoverflow-7a0a5.appspot.com',
  messagingSenderId: '731996450274'
};

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    StockComponent,
    CryptoComponent,
    RulesComponent,
    StockhomeComponent
    ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(AppRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ng4LoadingSpinnerModule,
    TabModule,
    Ng2AutoCompleteModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
