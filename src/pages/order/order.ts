import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {StorageProvider} from "../../providers/storage/storage";
import {OrderDetailPage} from "../order-detail/order-detail";

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage extends BaseUI {
  errorMessage: any;
  list: string[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public rest: RestProvider,
              public storage: StorageProvider) {
    super();
  }

  ionViewWillEnter() {
    let userInfo = this.storage.getData('userInfo');
    if (userInfo != null)
      this.getOrders();
    else this.list = [];
  }

  subStringByDigits(str, digits) {
    let result = str;
    if (result.length > digits) {
      result = result.substring(0, digits) + '...';
    }
    return result;
  }

  getOrders() {
    this.rest.getOrders().subscribe(data => {
      this.list = data;
    }, error => {
      this.errorMessage = <any>error;
    });
  }

  deleteItem(id) {
    this.rest.deleteOrder(id).subscribe(data => {
      this.getOrders();
      this.showToast(this.toastCtrl, '取消成功');
    }, error => {
      this.errorMessage = <any>error;
      this.showToast(this.toastCtrl, '取消失败');
    });
  }

  showAlert(e, id) {
    e.stopPropagation();
    let alert = this.alertCtrl.create({
      title: '确认取消？',
      message: '',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: data => {
            this.deleteItem(id);
          }
        }
      ]
    });
    alert.present();
  }

  jumpToHome() {
    this.navCtrl.parent.select(0);
  }

  jumpToDetail(id) {
    this.navCtrl.push(OrderDetailPage, {id: id});
  }
}
