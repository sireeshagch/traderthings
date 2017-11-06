webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".user {\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n    border-radius: 80%;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.myAnchor {\n    color: #000;\n    text-transform: capitalize;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n\n            <h3>\n                Stock Overflow\n            </h3>\n\n\n            <nav class=\"navbar navbar-default navbar-static-top\" role=\"navigation\">\n\n\n                <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                    <ul class=\"nav navbar-nav\">\n                        <li class=\"active\">\n                            <a class=\"btn btn-link\" type=\"button\" (click)=\"navigateToHome()\">Home</a>\n                        </li>\n                        <li>\n                            <a class=\"btn btn-link\" type=\"button\" (click)=\"navigateToStock()\">Stocks</a>\n                        </li>\n                        <li>\n                            <a class=\"btn btn-link\" type=\"button\" (click)=\"navigateToCrypto()\">Crypto Currency</a>\n                        </li>\n                        <li>\n                            <a class=\"btn btn-link\" type=\"button\" (click)=\"navigateToHome()\">Contact Us</a>\n                        </li>\n                    </ul>\n\n\n                    <form class=\"navbar-form navbar-right\" role=\"search\">\n                        <div class=\"form-group\">\n                            <input type=\"text\" placeholder=\"Search\" class=\"form-control\">\n                        </div>\n                        <button type=\"submit\" class=\"btn btn-default\">Search </button>\n                        <button data-toggle=\"modal\" data-target=\"#loginModal\" class=\"btn btn-default\" *ngIf=\"!isLoggedIn\">Login </button>\n                        <!-- <button class=\"btn btn-default\" *ngIf=\"isLoggedIn\">Logout</button> -->\n\n\n\n                        <div class=\"btn btn-default\" *ngIf=\"isLoggedIn\">\n                            <img class=\"user dropdown-toggle\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" src=\"{{userimg}}\">\n                            <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n                                <a class=\"dropdown-item myAnchor\" href=\" # \">View Profile</a><br>\n                                <a class=\"dropdown-item myAnchor\" (click)=\"logout() \">Logout</a><br>\n                            </div>\n                        </div>\n                    </form>\n\n\n                </div>\n            </nav>\n            <!-- Modal -->\n            <div id=\"loginModal\" class=\"modal fade\" role=\"dialog\">\n                <div class=\"modal-dialog \">\n\n                    <!-- Modal content-->\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                            <h4 class=\"modal-title\">Login</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form class=\"form-group\" role=\"form\">\n\n                                <div class=\"form-group\">\n                                    <label> Username</label>\n                                    <input type=\"text\" required [(ngModel)]=\"user\" placeholder=\"Username\" name=\"username\" class=\"form-control\">\n                                </div>\n\n\n                                <div class=\"form-group \">\n                                    <label> Password</label>\n                                    <input type=\"password\" required [(ngModel)]=\"pswd\" placeholder=\"password\" name=\"pswd\" class=\"form-control\">\n                                </div>\n\n\n\n                                <input type=\"submit\" (click)=\"onSubmit()\" data-dismiss=\"modal\" class=\"btn btn btn-success\" value=\"Login\">\n\n                            </form>\n                        </div>\n                        <div class=\" modal-footer\">\n                            <div class=\"text-center\">\n                                <p>forgot your password? <a href=\"#\">click here</a></p>\n                                <p>new user? <a href=\"#\">create new account</a></p>\n                                <br>\n                                <p>(or)</p> <br>\n                                <button type=\"button\" (click)=\"login()\" data-dismiss=\"modal\" class=\"btn btn-default\">Sign in with Google</button>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n\n\n            <router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.title = 'app';
        this.isLoggedIn = false;
        // User image URL
        this.userimg = '../assets/img/user.png';
        this.authService.afAuth.authState.subscribe(function (auth) {
            if (auth == null) {
                _this.isLoggedIn = false;
                _this.router.navigate(['home']);
                console.log('Failed : ' + _this.isLoggedIn);
            }
            else {
                _this.isLoggedIn = true;
                _this.router.navigate(['home']);
                console.log('Logged in : ' + _this.isLoggedIn);
            }
        });
    }
    AppComponent.prototype.navigateToStock = function () {
        this.router.navigate(['stock']);
    };
    AppComponent.prototype.navigateToCrypto = function () {
        this.router.navigate(['crypto']);
    };
    AppComponent.prototype.navigateToRules = function () {
        this.router.navigate(['rules']);
    };
    AppComponent.prototype.navigateToHome = function () {
        this.router.navigate(['home']);
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        this.authService.loginWithGoogle().then(function (data) {
            _this.router.navigate(['home']);
        });
    };
    AppComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['home']);
    };
    AppComponent.prototype.onSubmit = function () {
        console.log(this.user + ' ' + this.pswd);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__("../../../../angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__homepage_homepage_component__ = __webpack_require__("../../../../../src/app/homepage/homepage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__stock_stock_component__ = __webpack_require__("../../../../../src/app/stock/stock.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__crypto_crypto_component__ = __webpack_require__("../../../../../src/app/crypto/crypto.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__rules_rules_component__ = __webpack_require__("../../../../../src/app/rules/rules.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var firebaseConfig = {
    apiKey: "AIzaSyBs1YSjLC267dDVMm3hj8SwB4oDE5Hv41I",
    authDomain: "stockoverflow-7a0a5.firebaseapp.com",
    databaseURL: "https://stockoverflow-7a0a5.firebaseio.com",
    projectId: "stockoverflow-7a0a5",
    storageBucket: "",
    messagingSenderId: "731996450274"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_11__homepage_homepage_component__["a" /* HomepageComponent */],
            __WEBPACK_IMPORTED_MODULE_12__stock_stock_component__["a" /* StockComponent */],
            __WEBPACK_IMPORTED_MODULE_13__crypto_crypto_component__["a" /* CryptoComponent */],
            __WEBPACK_IMPORTED_MODULE_14__rules_rules_component__["a" /* RulesComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_routing__["a" /* AppRoutes */]),
            __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["b" /* AngularFireAuthModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_9__services_auth_service__["a" /* AuthService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutes; });
/* unused harmony export AppComponents */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__homepage_homepage_component__ = __webpack_require__("../../../../../src/app/homepage/homepage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stock_stock_component__ = __webpack_require__("../../../../../src/app/stock/stock.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__crypto_crypto_component__ = __webpack_require__("../../../../../src/app/crypto/crypto.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rules_rules_component__ = __webpack_require__("../../../../../src/app/rules/rules.component.ts");




var AppRoutes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_0__homepage_homepage_component__["a" /* HomepageComponent */] },
    { path: 'stock', component: __WEBPACK_IMPORTED_MODULE_1__stock_stock_component__["a" /* StockComponent */] },
    { path: 'crypto', component: __WEBPACK_IMPORTED_MODULE_2__crypto_crypto_component__["a" /* CryptoComponent */] },
    { path: 'rules', component: __WEBPACK_IMPORTED_MODULE_3__rules_rules_component__["a" /* RulesComponent */] }
];
var AppComponents = [
    __WEBPACK_IMPORTED_MODULE_0__homepage_homepage_component__["a" /* HomepageComponent */],
    __WEBPACK_IMPORTED_MODULE_1__stock_stock_component__["a" /* StockComponent */],
    __WEBPACK_IMPORTED_MODULE_2__crypto_crypto_component__["a" /* CryptoComponent */],
    __WEBPACK_IMPORTED_MODULE_3__rules_rules_component__["a" /* RulesComponent */]
];
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/crypto/crypto.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/crypto/crypto.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  crypto works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/crypto/crypto.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CryptoComponent = (function () {
    function CryptoComponent() {
    }
    CryptoComponent.prototype.ngOnInit = function () {
    };
    return CryptoComponent;
}());
CryptoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-crypto',
        template: __webpack_require__("../../../../../src/app/crypto/crypto.component.html"),
        styles: [__webpack_require__("../../../../../src/app/crypto/crypto.component.css")]
    }),
    __metadata("design:paramtypes", [])
], CryptoComponent);

//# sourceMappingURL=crypto.component.js.map

/***/ }),

/***/ "../../../../../src/app/homepage/homepage.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".carousel {\n    overflow: hidden;\n    width: 100%;\n}\n\n.slides {\n    list-style: none;\n    position: relative;\n    width: 500%;\n    /* Number of panes * 100% */\n    overflow: hidden;\n    /* Clear floats */\n    /* Slide effect Animations*/\n    -webkit-animation: carousel 30s infinite;\n    animation: carousel 30s infinite;\n}\n\n.slides>li {\n    position: relative;\n    float: left;\n    width: 20%;\n    /* 100 / number of panes */\n}\n\n.carousel img {\n    display: block;\n    width: 100%;\n    max-width: 100%;\n}\n\n.carousel h2 {\n    margin-bottom: 57;\n    font-size: 1em;\n    padding: 1.0em 1.0em 2.0em 2.0em;\n    position: absolute;\n    right: 0px;\n    bottom: 17px;\n    left: 0px;\n    text-align: center;\n    color: #fff;\n    background-color: rgba(0, 0, 0, 0.3);\n    text-transform: uppercase;\n}\n\n.carousel p {\n    margin-bottom: 15;\n    font-size: 1em;\n    padding: 1.5em 0.5em 1.5em 0.5em;\n    position: absolute;\n    right: 0px;\n    bottom: 0px;\n    left: 0px;\n    text-align: center;\n    color: #fff;\n}\n\n@-webkit-keyframes carousel {\n    0% {\n        left: -5%;\n    }\n    11% {\n        left: -5%;\n    }\n    12.5% {\n        left: -105%;\n    }\n    23.5% {\n        left: -105%;\n    }\n    25% {\n        left: -205%;\n    }\n    36% {\n        left: -205%;\n    }\n    37.5% {\n        left: -305%;\n    }\n    48.5% {\n        left: -305%;\n    }\n    50% {\n        left: -405%;\n    }\n    61% {\n        left: -405%;\n    }\n    62.5% {\n        left: -305%;\n    }\n    73.5% {\n        left: -305%;\n    }\n    75% {\n        left: -205%;\n    }\n    86% {\n        left: -205%;\n    }\n    87.5% {\n        left: -105%;\n    }\n    98.5% {\n        left: -105%;\n    }\n    100% {\n        left: -5%;\n    }\n}\n\n@keyframes carousel {\n    0% {\n        left: -5%;\n    }\n    11% {\n        left: -5%;\n    }\n    12.5% {\n        left: -105%;\n    }\n    23.5% {\n        left: -105%;\n    }\n    25% {\n        left: -205%;\n    }\n    36% {\n        left: -205%;\n    }\n    37.5% {\n        left: -305%;\n    }\n    48.5% {\n        left: -305%;\n    }\n    50% {\n        left: -405%;\n    }\n    61% {\n        left: -405%;\n    }\n    62.5% {\n        left: -305%;\n    }\n    73.5% {\n        left: -305%;\n    }\n    75% {\n        left: -205%;\n    }\n    86% {\n        left: -205%;\n    }\n    87.5% {\n        left: -105%;\n    }\n    98.5% {\n        left: -105%;\n    }\n    100% {\n        left: -5%;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/homepage/homepage.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\">\n    <!-- Indicators -->\n    <ol class=\"carousel-indicators\">\n        <li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\"></li>\n        <li data-target=\"#myCarousel\" data-slide-to=\"1\"></li>\n        <li data-target=\"#myCarousel\" data-slide-to=\"2\"></li>\n    </ol>\n\n    <!-- Wrapper for slides -->\n    <div class=\"carousel-inner\">\n        <div class=\"item active\">\n            <img src=\"{{carousel1}}\" alt=\"Los Angeles\">\n            <div class=\"carousel-caption\">\n                <h2>\n                    Trusted StockOverflow\n                </h2>\n                <p>\n                    Finance your future with Stock Trading\n                </p>\n            </div>\n        </div>\n\n        <div class=\"item\">\n            <img src=\"{{carousel2}}\" alt=\"Chicago\">\n            <div class=\"carousel-caption\">\n                <h2>\n                    Stock Market Analysis\n                </h2>\n                <p>\n                    Intuitive, powerful tools designed for you.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"item\">\n            <img src=\"{{carousel3}}\" alt=\"New York\">\n            <div class=\" carousel-caption \">\n                <h2>\n                    Crypto Trends\n                </h2>\n                <p>\n                    Monitor the crypto trends and real time market streams\n                </p>\n            </div>\n\n        </div>\n    </div>\n\n    <!-- Left and right controls -->\n    <a class=\"left carousel-control\" href=\"#myCarousel\" data-slide=\"prev\">\n        <span class=\"glyphicon glyphicon-chevron-left\"></span>\n        <span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"right carousel-control\" href=\"#myCarousel\" data-slide=\"next\">\n        <span class=\"glyphicon glyphicon-chevron-right\"></span>\n        <span class=\"sr-only\">Next</span>\n    </a>\n</div>\n<br>\n<div class=\"jumbotron \">\n    <h2>\n        Welcome to StockOverflow!\n    </h2>\n    <p>\n        Analyze and Monitor the Latest Stock trends! Enjoy our Crypto Currency Game without having to worry about any privacy/monetary issues. Learn some Golden rules of trading to help you maximize your success!\n    </p>\n    <p>\n        <a class=\"btn \" href=\"# \">Learn More</a>\n    </p>\n</div>\n<br>\n<div class=\"row \">\n    <div class=\"col-md-4 \">\n        <div class=\"thumbnail \">\n            <img alt=\"Bootstrap Thumbnail First \" src=\"{{stock}}\">\n            <div class=\"caption \">\n                <h3>\n                    Top Trending Stocks\n                </h3>\n                <p>\n                    Pay attention to whats going on in the world. Here are your top trending stocks that have been popular this year.\n                </p>\n                <p>\n                    <a class=\"btn btn-primary \" (click)=\"navigateToStock()\">Learn More</a>\n                </p>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-4 \">\n        <div class=\"thumbnail \">\n            <img alt=\"Bootstrap Thumbnail Second \" src=\"{{bitcoin}}\">\n            <div class=\"caption \">\n                <h3>\n                    Play with Crypto Currency\n                </h3>\n                <p>\n                    Interested in cryptocurrency but don't want to risk your money? Play for free!\n                </p>\n                <p>\n                    <a class=\"btn btn-primary \" (click)=\"navigateToCrypto()\">Learn More</a>\n                </p>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-4 \">\n        <div class=\"thumbnail \">\n            <img alt=\"Bootstrap Thumbnail Third \" src=\"{{rules}}\">\n            <div class=\"caption \">\n                <h3>\n                    Stock Trading Rules\n                </h3>\n                <p>\n                    If you’re going to trade in stock, adhere to some golden rules to help you maximize your success\n                </p>\n                <p>\n                    <a class=\"btn btn-primary \" (click)=\"navigateToRules()\">Learn More</a>\n                </p>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/homepage/homepage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomepageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomepageComponent = (function () {
    function HomepageComponent(router) {
        this.router = router;
        // image URLs
        this.carousel1 = '../assets/img/markets.jpg';
        this.carousel2 = '../assets/img/stock.jpg';
        this.carousel3 = '../assets/img/bit.jpg';
        this.rules = '../assets/img/rules.jpg';
        this.bitcoin = '../assets/img/bitcoin-thumb.jpg';
        this.stock = '../assets/img/stocktrends.jpg';
    }
    HomepageComponent.prototype.ngOnInit = function () {
    };
    HomepageComponent.prototype.navigateToStock = function () {
        this.router.navigate(['stock']);
    };
    HomepageComponent.prototype.navigateToCrypto = function () {
        this.router.navigate(['crypto']);
    };
    HomepageComponent.prototype.navigateToRules = function () {
        this.router.navigate(['rules']);
    };
    HomepageComponent.prototype.navigateToHome = function () {
        this.router.navigate(['home']);
    };
    return HomepageComponent;
}());
HomepageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-homepage',
        template: __webpack_require__("../../../../../src/app/homepage/homepage.component.html"),
        styles: [__webpack_require__("../../../../../src/app/homepage/homepage.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
], HomepageComponent);

var _a;
//# sourceMappingURL=homepage.component.js.map

/***/ }),

/***/ "../../../../../src/app/rules/rules.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mylist {\n    font-size: 1.3em;\n    position: absolute;\n}\n\n.myDiv {\n    -ms-flex-line-pack: center;\n        align-content: center;\n    margin: 70px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/rules/rules.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-11\">\n            <div class=\"myDiv\">\n                <h2 class=\"text-center text-primary\">\n                    THE BASIC RULES OF STOCK TRADING\n                </h2>\n                <p class=\"text-info text-center\">By <a href=\"http://www.dummies.com/?s=&amp;a=paul-mladjenovic\">Paul Mladjenovic </a> </p>\n                <h3 class=\"text-default \">\n                    If you’re going to trade in stock, adhere to some golden rules to help you maximize your success (or at least minimize your potential losses):\n                </h3>\n                <br>\n\n                <ul class=\"mylist text-default\">\n                    <li>\n                        <strong>Don’t commit all your cash at once: </strong>In a fast-moving market, opportunities come up all the time. Try to keep some cash on hand to take advantage of those opportunities.\n                    </li>\n                    <li>\n                        <strong>Have a plan: </strong>Try to have predetermined points at which you cut losses or take profits.\n                    </li>\n                    <li>\n                        <strong>Understand that taking profits is not a sin: </strong>Sometimes, a bird in the hand is worth two in the bush. Markets can reverse fairly quickly. If you have a stock position sitting there with a fat profit, it can’t hurt\n                        to take the profit. This action gives you cash for the next opportunity.\n                    </li>\n                    <li>\n                        <strong>Discover hedging techniques: </strong>Just because you’re bullish doesn’t mean that you can’t also put on a bearish position. Hedging techniques protect you when the market moves against you.\n                    </li>\n                    <li>\n                        <strong>Find out which events move markets: </strong>Research the market and discover what types of events tend to move it. Serious short-term traders keep one eye on their positions and the other on what’s going on in the world.\n                        Keep informed by regularly reading financial publications and websites.\n                    </li>\n                    <li>\n                        <strong>Check the stock’s trading history: </strong>Charts and related data tell you how a particular stock has moved in recent weeks, months, and years. Do you see any seasonality or reliable patterns that may help you judge future\n                        movements?\n                    </li>\n                    <li>\n                        <strong>Use stop-loss and limit orders: </strong>Using trade orders is an integral part of the trader’s overall strategy.\n                    </li>\n                    <li>\n                        <strong>Use discipline and patience versus emotion and panic: </strong>Part of the human equation in the world of financial markets is that fear and greed can become irrational, short-term drivers of prices. Instead of joining\n                        the crowd, watch them to give you an advantage in assessing a stock’s price movements. Stick with your plan and use discipline and patience.\n                    </li>\n                    <li>\n                        <strong>Minimize transaction costs: </strong>Keep in mind that because trading is typically active and short-term, transaction costs are significant. Active trading can mean lots of brokerage commissions, even in this age of Internet-based\n                        brokerage firms. Therefore, traders who trade frequently should shop around for brokerage firms that charge low commissions.\n                    </li>\n                    <li>\n                        <strong>Understand the beta of a stock: </strong>The volatility of a stock is an important consideration for traders. The more volatile a stock is, the greater its ups and downs are. Therefore, traders should regularly check the\n                        stock’s beta. Beta is a statistical measure of how volatile a particular stock is relative to a market standard.<br>How is it measured? The S&P 500 (for example) is given a beta of 1. A stock with a beta of 2 is considered twice\n                        as volatile as the index. In other words, if the index falls by 10 percent, the stock in question has the potential of falling by 20 percent.<br>Traders looking for fast (and hopefully profitable) movement look for high-beta opportunities.\n                        A stock’s beta can be found on various financial websites.\n                    </li>\n                    <li>\n                        <strong>Read and learn from top traders: </strong>Last (but not least), learn from the great ones out there, such as the legendary Jesse Livermore. You can read all about his trading exploits in the book Reminiscences of a Stock\n                        Operator by Edwin Lefèvre and Jon D. Markman (Wiley).\n                    </li>\n                    <br>\n                    <p>Don’t forget the advice from the immortal Will Rogers: “Don’t gamble. Take all your savings and buy some good stock and hold it till it goes up; then sell it. If it don’t go up, don’t buy it.”</p>\n                </ul>\n\n\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/rules/rules.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RulesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RulesComponent = (function () {
    function RulesComponent() {
    }
    RulesComponent.prototype.ngOnInit = function () {
    };
    return RulesComponent;
}());
RulesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-rules',
        template: __webpack_require__("../../../../../src/app/rules/rules.component.html"),
        styles: [__webpack_require__("../../../../../src/app/rules/rules.component.css")]
    }),
    __metadata("design:paramtypes", [])
], RulesComponent);

//# sourceMappingURL=rules.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__("../../../../firebase/app/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = (function () {
    function AuthService(afAuth) {
        this.afAuth = afAuth;
        this.provider = new __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].GoogleAuthProvider();
    }
    AuthService.prototype.loginWithGoogle = function () {
        return this.afAuth.auth.signInWithPopup(this.provider);
        // return this.afAuth.auth.signInWithPopup(this.provider).then((result) => console.log('Signin result', result))
        //     .catch((error) => console.error('Sigin error', error));
    };
    AuthService.prototype.logout = function () {
        this.afAuth.auth.signOut();
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/pager.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PagerService = (function () {
    function PagerService() {
    }
    PagerService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (pageSize === void 0) { pageSize = 10; }
        var testString = "nothing";
        // calculate total pages
        testString = "entered function";
        var totalPages = Math.ceil(totalItems / pageSize);
        testString = "executing...";
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            }
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        testString = "before underscore---working";
        // create an array of pages to ng-repeat in the pager control
        var pages = __WEBPACK_IMPORTED_MODULE_0_lodash__["range"](startPage, endPage + 1);
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
    };
    return PagerService;
}());
PagerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])()
], PagerService);

//# sourceMappingURL=pager.service.js.map

/***/ }),

/***/ "../../../../../src/app/stock/StockData.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockData; });
var StockData = (function () {
    function StockData() {
    }
    return StockData;
}());

//# sourceMappingURL=StockData.js.map

/***/ }),

/***/ "../../../../../src/app/stock/TimeSeriesData.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeSeriesData; });
var TimeSeriesData = (function () {
    function TimeSeriesData() {
        this.time = "";
    }
    return TimeSeriesData;
}());

//# sourceMappingURL=TimeSeriesData.js.map

/***/ }),

/***/ "../../../../../src/app/stock/stock.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".table tr.active td {\n    background-color: #123456 !important;\n    color: white;\n}\n\n.loadGIF {\n    -ms-wrap-margin: 30px;\n    display: inline-block;\n    width: 60px;\n    height: 60px;\n    border-radius: 50%;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.divider {\n    height: 1px;\n    width: 100%;\n    display: block;\n    /* for use on default inline elements like span */\n    margin: 9px 0;\n    overflow: hidden;\n    background-color: #e5e5e5;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/stock/stock.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\">\n    <div class=\"container-fluid\">\n        <table class=\"table table-hover table-striped\">\n            <thead>\n                <tr class=\"text-center\">\n                    <td class=\"col-md-1\">Sl No</td>\n                    <td class=\"col-md-2\">Symbol</td>\n                    <td class=\"col-md-2\">Name</td>\n                    <td class=\"col-md-2\">Market Cap</td>\n                    <td class=\"col-md-2\">Sector</td>\n                    <td class=\"col-md-2\">Industry</td>\n                </tr>\n            </thead>\n\n            <tbody>\n\n                <tr *ngFor=\"let stock of pagedItems; let i=index\">\n                    <td class=\"col-md-1\"> {{(i+1)+(10*(pager.currentPage-1))}}</td>\n                    <td class=\"col-md-2\"><a (click)=\"fetchStockDetails(stock)\" data-toggle=\"modal\" data-target=\"#stockModal\">{{stock.Symbol}}</a></td>\n                    <td class=\"col-md-2\">{{stock.Name}}</td>\n                    <td class=\"col-md-2\">{{stock.MarketCap}}</td>\n                    <td class=\"col-md-2\">{{stock.Sector}}</td>\n                    <td class=\"col-md-2\">{{stock.Industry}}</td>\n                </tr>\n\n            </tbody>\n\n\n            <tfoot>\n                <tr class=\"text-center\">\n                    <td colspan=\"5\">\n                        <ul class=\"pagination\">\n                            <li [ngClass]=\" {disabled:pager.currentPage===1 } \">\n                                <a (click)=\"setPage(1) \">First</a>\n                            </li>\n                            <li [ngClass]=\"{disabled:pager.currentPage===1 } \">\n                                <a (click)=\"setPage(pager.currentPage - 1) \">Previous</a>\n                            </li>\n                            <li *ngFor=\"let page of pager.pages \" [ngClass]=\"{active:pager.currentPage==page}\">\n                                <a (click)=\"setPage(page) \">{{page}}</a>\n                            </li>\n                            <li [ngClass]=\"{disabled:pager.currentPage===pager.totalPages} \">\n                                <a (click)=\"setPage(pager.currentPage + 1) \">Next</a>\n                            </li>\n                            <li [ngClass]=\"{disabled:pager.currentPage===pager.totalPages} \">\n                                <a (click)=\"setPage(pager.totalPages) \">Last</a>\n                            </li>\n                        </ul>\n                    </td>\n                </tr>\n            </tfoot>\n        </table>\n        <!-- pager -->\n\n    </div>\n</div>\n\n<!-- View Stock Modal-->\n\n<div id=\"stockModal\" class=\"modal fade\" role=\"dialog\">\n    <div class=\"modal-dialog \">\n\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                <h4 class=\"modal-title\">Stock Details</h4>\n            </div>\n            <div class=\"modal-body\">\n\n                <img class=\"loadGIF\" src=\"{{loadGIF}}\" *ngIf=\"isLoading\">\n\n                <div *ngIf=\"!isLoading && stockData\">\n\n                    <div class=\"container-fluid\">\n                        <div class=\"row\">\n                            <div class=\"col-md-3\">\n                                <span class=\"label label-primary\">Symbol: {{stockData.symbol}}</span>\n                            </div>\n                            <div class=\"col-md-3\">\n                                <span class=\"label label-primary\">Interval: {{stockData.interval}} </span>\n                            </div>\n                            <div class=\"col-md-3\">\n                                <span class=\"label label-primary\">Last Refreshed: {{stockData.lastRefreshed}} {{stockData.timezone}}</span>\n                            </div>\n                        </div>\n                    </div>\n                    <hr class=\"divider\" />\n                    <!-- Timeseries data-->\n                    <div class=\"text-center\">\n                        <div class=\"container-fluid\">\n                            <table class=\"table table-hover table-striped\">\n                                <thead>\n                                    <tr class=\"text-center\">\n                                        <td class=\"col-md-1\">Time</td>\n                                        <td class=\"col-md-2\">Open</td>\n                                        <td class=\"col-md-2\">High</td>\n                                        <td class=\"col-md-2\">Low</td>\n                                        <td class=\"col-md-2\">Close</td>\n                                        <td class=\"col-md-2\">Mean</td>\n\n                                    </tr>\n                                </thead>\n\n                                <tbody>\n\n                                    <tr *ngFor=\"let tsd of tsData; let i=index\">\n                                        <td class=\"col-md-1\">{{tsd.time}}</td>\n                                        <td class=\"col-md-2\">{{tsd.data['1. open']}}</td>\n                                        <td class=\"col-md-2\">{{tsd.data['2. high']}}</td>\n                                        <td class=\"col-md-2\">{{tsd.data['3. low']}}</td>\n                                        <td class=\"col-md-2\">{{tsd.data['4. close']}}</td>\n                                        <td class=\"col-md-2\">{{tsd.mean}}</td>\n                                    </tr>\n\n                                </tbody>\n\n\n                                <tfoot>\n\n                                </tfoot>\n                            </table>\n                            <!-- pager -->\n\n                        </div>\n                    </div>\n\n                    <!--end-->\n                </div>\n\n\n\n\n\n            </div>\n            <div class=\" modal-footer\">\n                <div class=\"text-center\">\n\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/stock/stock.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stock_service__ = __webpack_require__("../../../../../src/app/stock/stock.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_pager_service__ = __webpack_require__("../../../../../src/app/services/pager.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__StockData__ = __webpack_require__("../../../../../src/app/stock/StockData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TimeSeriesData__ = __webpack_require__("../../../../../src/app/stock/TimeSeriesData.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var StockComponent = (function () {
    function StockComponent(stockService, pagerService, router) {
        this.stockService = stockService;
        this.pagerService = pagerService;
        this.router = router;
        this.item = 'Stocks';
        this.pager = {}; // pager object
        this.apiKey = '80VEEF48E6H7Z2VC';
        this.stockData = new __WEBPACK_IMPORTED_MODULE_4__StockData__["a" /* StockData */];
        this.isLoading = true;
        this.loadGIF = '../assets/img/loading.gif';
        this.tsData = new Array();
    }
    StockComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.stocks.length, page);
        // get current page of items
        this.pagedItems = this.stocks.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    StockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.stockService.getStocks()
            .subscribe(function (stocks) {
            _this.stocks = stocks;
            // console.log("length:"+this.restaurants.length);
            _this.setPage(1);
        });
    };
    StockComponent.prototype.populateStockData = function (info, clickedSymbol, lastRefreshed, interval, timezone) {
        this.stockData.info = info;
        this.stockData.symbol = clickedSymbol;
        this.stockData.lastRefreshed = lastRefreshed;
        this.stockData.interval = interval;
        this.stockData.timezone = timezone;
    };
    StockComponent.prototype.fetchStockDetails = function (clickedStock) {
        var _this = this;
        this.clickedSymbol = clickedStock.Symbol;
        this.minDataURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' +
            this.clickedSymbol + '&interval=1min&apikey=' + this.apiKey;
        this.stockService.getMinuteData(this.minDataURL)
            .subscribe(function (minuteData) {
            _this.minuteData = minuteData;
            _this.metaDataInfo = _this.minuteData['Meta Data']['1. Information'];
            _this.metaDataLastRefreshed = _this.minuteData['Meta Data']['3. Last Refreshed'];
            _this.metaDataInterval = _this.minuteData['Meta Data']['4. Interval'];
            _this.metaDataTimezone = _this.minuteData['Meta Data']['6. Time Zone'];
            _this.populateStockData(_this.metaDataInfo, _this.clickedSymbol, _this.metaDataLastRefreshed, _this.metaDataInterval, _this.metaDataTimezone);
            var j = 0;
            // tslint:disable-next-line:forin
            for (var i in _this.minuteData['Time Series (1min)']) {
                _this.tsData[j] = new __WEBPACK_IMPORTED_MODULE_5__TimeSeriesData__["a" /* TimeSeriesData */];
                _this.tsData[j].time = i;
                _this.tsData[j].data = _this.minuteData['Time Series (1min)'][i];
                _this.sum = Number(_this.tsData[j].data['1. open']) +
                    Number(_this.tsData[j].data['2. high']) +
                    Number(_this.tsData[j].data['3. low']) +
                    Number(_this.tsData[j].data['4. close']);
                _this.tsData[j].mean = _this.sum / 4;
                console.log('mean:' + _this.tsData[j].mean);
                j++;
            }
            _this.isLoading = false;
        });
    };
    return StockComponent;
}());
StockComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-stock',
        template: __webpack_require__("../../../../../src/app/stock/stock.component.html"),
        styles: [__webpack_require__("../../../../../src/app/stock/stock.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__stock_service__["a" /* StockService */], __WEBPACK_IMPORTED_MODULE_2__services_pager_service__["a" /* PagerService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__stock_service__["a" /* StockService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__stock_service__["a" /* StockService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_pager_service__["a" /* PagerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_pager_service__["a" /* PagerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object])
], StockComponent);

var _a, _b, _c;
//# sourceMappingURL=stock.component.js.map

/***/ }),

/***/ "../../../../../src/app/stock/stock.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StockService = (function () {
    function StockService(http) {
        this.http = http;
    }
    //retrieving StoclService
    StockService.prototype.getStocks = function () {
        return this.http.get('http://ec2-34-235-135-194.compute-1.amazonaws.com:3000/stocks/?limit=500')
            .map(function (res) { return res.json(); });
    };
    StockService.prototype.getMinuteData = function (api) {
        return this.http.get(api)
            .map(function (res) { return res.json(); });
    };
    return StockService;
}());
StockService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], StockService);

var _a;
//# sourceMappingURL=stock.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map