import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {StorageProvider} from "../../providers/storage/storage";
import {DetailPage} from "../detail/detail";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  errorMessage: any;
  goods = [];
  show: boolean = false;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public rest: RestProvider,
              public storage: StorageProvider) {
  }

  ionViewWillEnter() {
    let userInfo = this.storage.getData('userInfo');
    if (userInfo != null)
      this.getGoods();
    else this.goods = [];
  }

  getGoods() {
    this.rest.getGoods().subscribe(data => {
      this.goods = data.results;
    }, error => {
      this.errorMessage = <any>error;
    });
  }

  jumpToMine() {
    this.navCtrl.parent.select(3);
  }

  jumpToDetail(item) {
    this.navCtrl.push(DetailPage, {item: item});
  }
}
