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
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from "../../providers/rest/rest";
import { BaseUI } from "../../common/baseui";
import { AreasProvincesPage } from "../areas-provinces/areas-provinces";
/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MinePage = /** @class */ (function (_super) {
    __extends(MinePage, _super);
    function MinePage(navCtrl, navParams, loadingCtrl, rest) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        return _this;
    }
    MinePage.prototype.ionViewWillEnter = function () {
    };
    MinePage.prototype.showProvince = function () {
        this.navCtrl.push(AreasProvincesPage);
    };
    MinePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-mine',
            templateUrl: 'mine.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            RestProvider])
    ], MinePage);
    return MinePage;
}(BaseUI));
export { MinePage };
//# sourceMappingURL=mine.js.map