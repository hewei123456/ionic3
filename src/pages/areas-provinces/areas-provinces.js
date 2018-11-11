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
import { RestProvider } from "../../providers/rest/rest";
import { BaseUI } from "../../common/baseui";
import { AreasCitiesPage } from "../areas-cities/areas-cities";
/**
 * Generated class for the AreasProvincesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// @IonicPage()
var AreasProvincesPage = /** @class */ (function (_super) {
    __extends(AreasProvincesPage, _super);
    function AreasProvincesPage(navCtrl, navParams, loadingCtrl, rest) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        _this.provinces = [];
        return _this;
    }
    AreasProvincesPage.prototype.ionViewWillEnter = function () {
        this.getProvinces();
    };
    AreasProvincesPage.prototype.goCities = function (provinceId, provinceName) {
        this.navCtrl.push(AreasCitiesPage, { provinceId: provinceId, provinceName: provinceName });
    };
    AreasProvincesPage.prototype.getProvinces = function () {
        var _this = this;
        var loading = this.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getProvinces().subscribe(function (data) {
            _this.provinces = data;
            loading.dismissAll();
        }, function (error) {
            loading.dismissAll();
            _this.errorMessage = error;
        });
    };
    AreasProvincesPage = __decorate([
        Component({
            selector: 'page-areas-provinces',
            templateUrl: 'areas-provinces.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            RestProvider])
    ], AreasProvincesPage);
    return AreasProvincesPage;
}(BaseUI));
export { AreasProvincesPage };
//# sourceMappingURL=areas-provinces.js.map