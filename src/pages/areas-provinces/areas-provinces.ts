import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";
import {AreasCitiesPage} from "../areas-cities/areas-cities";


/**
 * Generated class for the AreasProvincesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-areas-provinces',
  templateUrl: 'areas-provinces.html',
})
export class AreasProvincesPage extends BaseUI {
  errorMessage: any;
  provinces: Array<object>;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public rest: RestProvider) {
    super();
  }

  ionViewWillEnter() {
    this.getProvinces();
  }

  goCities(provinceId, province) {
    this.navCtrl.push(AreasCitiesPage, {provinceId: provinceId, province: province});
  }

  getProvinces() {
    let loading = this.showLoading(this.loadingCtrl, '加载中...');
    this.rest.getProvinces().subscribe(data => {
      this.provinces = data;
      loading.dismissAll();
    }, error => {
      loading.dismissAll();
      this.errorMessage = <any>error;
    });
  }
}
