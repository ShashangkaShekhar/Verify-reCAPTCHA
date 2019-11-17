"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(router, formBuilder, titleService, _http) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.titleService = titleService;
        this._http = _http;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Home");
        this.title = 'Angular8';
        this.reactiveForm = this.formBuilder.group({
            exampleInputEmail1: new forms_1.FormControl('', forms_1.Validators.required),
            exampleInputPassword1: new forms_1.FormControl('', forms_1.Validators.required),
            recaptchaReactive: new forms_1.FormControl(null, forms_1.Validators.required)
        });
    };
    HomeComponent.prototype.ngAfterViewInit = function () { };
    HomeComponent.prototype.onSubmit = function () {
        var _this = this;
        var _postUrl = 'http://localhost:50760/api/values/Validate';
        this.submitForm(this.reactiveForm.value, _postUrl)
            .subscribe(function (response) {
            _this.res = response;
            if (_this.res.resdata.success) {
                _this.resmessage = 'Verified Successfully!';
                _this.reset();
            }
            else {
                _this.resmessage = 'Verification Error!';
            }
        }, function (error) {
            console.log(error);
        });
    };
    //HTTP-POST Request
    HomeComponent.prototype.submitForm = function (model, postUrl) {
        return this._http.post(postUrl, model)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    HomeComponent.prototype.reset = function () {
        this.reactiveForm.setValue({
            exampleInputEmail1: null,
            exampleInputPassword1: null,
            recaptchaReactive: null
        });
    };
    HomeComponent.prototype.handleError = function (error) {
        return rxjs_1.Observable.throw(error.json().error || 'Opps!! Server error');
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './app/home/component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            forms_1.FormBuilder,
            platform_browser_1.Title,
            http_1.Http])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
