import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {AreasCountiesPage} from "../areas-counties/areas-counties";

/**
 * Generated class for the AreasCitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-areas-cities',
  templateUrl: 'areas-cities.html',
})
export class AreasCitiesPage extends BaseUI {
  errorMessage: any;
  cities: Array<object>;
  provinceId: number;
  province: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public rest: RestProvider) {
    super();
  }

  ionViewWillEnter() {
    this.province = this.navParams.get('province');
    this.provinceId = parseInt(this.navParams.get('provinceId'));
    this.getCities(this.provinceId);
  }

  getCities(provinceId) {
    let loading = this.showLoading(this.loadingCtrl, '加载中...');
    this.rest.getCities(provinceId).subscribe(data => {
      this.cities = data.children;
      loading.dismissAll();
    }, error => {
      loading.dismissAll();
      this.errorMessage = <any>error;
    });
  }

  goCounties(cityId, city) {
    this.navCtrl.push(AreasCountiesPage, {cityId: cityId, city: city});
  }
}
