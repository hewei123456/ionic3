import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";

/**
 * Generated class for the AreasCountiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-areas-counties',
  templateUrl: 'areas-counties.html',
})
export class AreasCountiesPage extends BaseUI {
  errorMessage: any;
  counties: Array<object>;
  cityId: number;
  city: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider) {
    super();
  }

  ionViewWillEnter() {
    this.cityId = parseInt(this.navParams.get('cityId'));
    this.city = this.navParams.get('city');
    this.getCounties(this.cityId);
  }

  getCounties(cityId) {
    let loading = this.showLoading(this.loadingCtrl, '加载中...');
    this.rest.getCounties(cityId).subscribe(data => {
      this.counties = data.children;
      loading.dismissAll();
    }, error => {
      loading.dismissAll();
      this.errorMessage = <any>error;
    });
  }

  sel(countyId) {
    let loading = this.showLoading(this.loadingCtrl, '修改中...');
    this.rest.updateUserAreaInfo(parseInt(countyId)).subscribe(data => {
      loading.dismissAll();
      this.showToast(this.toastCtrl, '修改成功');
      this.navCtrl.popToRoot();
    }, error => {
      loading.dismissAll();
      this.showToast(this.toastCtrl, '网络故障...');
      this.errorMessage = <any>error;
    });
  }
}
