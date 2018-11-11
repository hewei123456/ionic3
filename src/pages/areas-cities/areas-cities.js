var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { BaseUI } from "../../common/baseui";
import { RestProvider } from "../../providers/rest/rest";
import { AreasCountiesPage } from "../areas-counties/areas-counties";
/**
 * Generated class for the AreasCitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AreasCitiesPage = /** @class */ (function (_super) {
    __extends(AreasCitiesPage, _super);
    function AreasCitiesPage(navCtrl, navParams, loadingCtrl, rest) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        return _this;
    }
    AreasCitiesPage.prototype.ionViewWillEnter = function () {
        this.provinceName = this.navParams.get('provinceName');
        this.provinceId = parseInt(this.navParams.get('provinceId'));
        this.getCities(this.provinceId);
    };
    AreasCitiesPage.prototype.getCities = function (provinceId) {
        var _this = this;
        var loading = this.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getCities(provinceId).subscribe(function (data) {
            _this.cities = data.children;
            loading.dismissAll();
        }, function (error) {
            loading.dismissAll();
            _this.errorMessage = error;
        });
    };
    AreasCitiesPage.prototype.goCounties = function (cityId, cityName) {
        this.navCtrl.push(AreasCountiesPage, { cityId: cityId, cityName: cityName });
    };
    AreasCitiesPage = __decorate([
        Component({
            selector: 'page-areas-cities',
            templateUrl: 'areas-cities.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            RestProvider])
    ], AreasCitiesPage);
    return AreasCitiesPage;
}(BaseUI));
export { AreasCitiesPage };
//# sourceMappingURL=areas-cities.js.map