import {Component} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {AddressPage} from "../address/address";
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage extends BaseUI {
  errorMessage: any;
  address: string = '';
  signer_name: string = '';
  signer_mobile: string = '';
  post_script: string = '';
  date: string;
  time: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public rest: RestProvider) {
    super();
  }

  openAddress() {
    let modal = this.modalCtrl.create(AddressPage, {type: 'confirm'});
    modal.onDidDismiss(data => {
      if (data) {
        let item = data.item;
        this.address = item.address;
        this.signer_name = item.signer_name;
        this.signer_mobile = item.signer_mobile;
      }
    });
    modal.present();
  }

  addOrder() {
    if (this.address.length == 0) {
      this.showToast(this.toastCtrl, '回收地址不能为空');
      return;
    }
    if (this.date.length == 0) {
      this.showToast(this.toastCtrl, '预订日期不能为空');
      return;
    }
    if (this.time.length == 0) {
      this.showToast(this.toastCtrl, '预订时间不能为空');
      return;
    }
    let dateTime = this.date + 'T' + this.time;
    this.rest.addOrder(this.address, this.signer_name, this.signer_mobile, this.post_script, dateTime).subscribe(data => {
      this.navCtrl.popToRoot();
      this.navCtrl.parent.select(2);
    }, error => {
      this.errorMessage = <any>error;
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '确认预约？',
      message: '下单后我们的管理员会提前与您联系，预约可随时取消',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: data => {
            this.addOrder();
          }
        }
      ]
    });
    alert.present();
  }
}
