import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage extends BaseUI {
  errorMessage: any;
  goodsList: any[] = [];
  id: number;
  order_time: string = '';
  order_sn: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public rest: RestProvider) {
    super();
  }

  ionViewWillEnter() {
    this.id = this.navParams.get('id');
    console.log(this.id);
    this.getOrderDetail();
  }

  getPrice(nums, price) {
    return (nums * price).toFixed(2);
  }

  calc() {
    let result = 0;
    console.log(this.goodsList);
    this.goodsList.forEach(item => {
      result += Number(this.getPrice(item.goods_num, item.goods.market_price));
    });
    return result;
  }

  getOrderDetail() {
    this.rest.getOrderDetail(this.id).subscribe(data => {
      this.goodsList = data.goods;
      this.order_time = data.order_time;
      this.order_sn = data.order_sn;
    }, error => this.errorMessage = <any>error)
  }

  deleteItem() {
    this.rest.deleteOrder(this.id).subscribe(data => {
      this.showToast(this.toastCtrl, '取消成功');
      this.navCtrl.pop();
    }, error => {
      this.errorMessage = <any>error;
      this.showToast(this.toastCtrl, '取消失败');
    });
  }

  showAlert() {
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
            this.deleteItem();
          }
        }
      ]
    });
    alert.present();
  }
}
