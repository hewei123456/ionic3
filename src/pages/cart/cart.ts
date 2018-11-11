import {Component} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";
import {StorageProvider} from "../../providers/storage/storage";
import {BookPage} from "../book/book";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage extends BaseUI {
  errorMessage: any;
  list: string[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public storage: StorageProvider,
              public rest: RestProvider) {
    super();
  }

  ionViewWillEnter() {
    let userInfo = this.storage.getData('userInfo');
    if (userInfo != null)
      this.getCart();
    else this.list = [];
  }

  getCart() {
    this.rest.getCart().subscribe(data => {
      this.list = data;
    }, error => {
      this.errorMessage = <any>error;
    });
  }

  getPrice(nums, price) {
    return (nums * price).toFixed(2);
  }

  delete(id) {
    let loading = this.showLoading(this.loadingCtrl, '删除中...');
    this.rest.deleteCart(id).subscribe(data => {
      loading.dismissAll();
      this.showToast(this.toastCtrl, '删除成功');
      this.getCart();
    }, error => {
      loading.dismissAll();
      this.showToast(this.toastCtrl, '删除失败');
      this.errorMessage = <any>error;
    });
  }

  showDeleteAlert(id) {
    let alert = this.alertCtrl.create({
      title: '确认删除？',
      message: '',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: data => {
            this.delete(id);
          }
        }
      ]
    });
    alert.present();
  }

  jumpToHome() {
    this.navCtrl.parent.select(0);
  }

  jumpToBook() {
    this.navCtrl.push(BookPage);
  }
}
