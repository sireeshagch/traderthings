import { HomepageComponent } from './homepage/homepage.component';
import { StockComponent } from './stock/stock.component';
import { CryptoComponent } from './crypto/crypto.component';
import { RulesComponent } from './rules/rules.component';
import { StockhomeComponent } from './stockhome/stockhome.component';
import { SignupComponent } from './signup/signup.component';


export const AppRoutes: any = [
  { path: 'home', component: HomepageComponent},
  { path: 'stock', component: StockComponent},
  { path: 'crypto', component: CryptoComponent},
  { path: 'rules', component: RulesComponent},
  { path: 'stockhome', component: StockhomeComponent},
  { path: 'signup', component: SignupComponent}
];

export const AppComponents: any = [
  HomepageComponent,
  StockComponent,
  CryptoComponent,
  RulesComponent,
  StockhomeComponent,
  SignupComponent
];
