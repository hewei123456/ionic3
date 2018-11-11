import {Component} from '@angular/core';
import {IonicPage, AlertController, NavController, NavParams, ToastController, App} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage extends BaseUI {
  errorMessage: any;
  goods: any = {
    name: '',
    goods_front_image: '',
    goods_brief: '',
    market_price: 0.0
  };
  show: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public appCtrl: App,
              public rest: RestProvider) {
    super();
  }

  ionViewWillEnter() {
    this.getItem();
  }

  getItem() {
    this.goods = this.navParams.get('item');
  }

  addCart(nums, goods) {
    this.rest.addCart(nums, goods).subscribe(data => {
      this.showToast(this.toastCtrl, '添加成功');
    }, error => {
      this.errorMessage = <any>error;
    });
  }

  goShoppingCart() {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(1)
  }

  presentInputBox() {
    let alert = this.alertCtrl.create({
      title: this.goods.name,
      message: '',
      inputs: [
        {
          name: 'nums',
          placeholder: '请输入回收数量'
        },
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: data => {
            this.addCart(data.nums, this.goods.id);
          }
        }
      ]
    });
    alert.present();
  }
}
