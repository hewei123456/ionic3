import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage extends BaseUI {
  errorMessage: any;
  addresses: string[] = [];
  type: string = 'common';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController,
              public rest: RestProvider,
              public common: CommonProvider) {
    super();
  }

  ionViewWillEnter() {
    this.type = this.navParams.get('type');
    this.getAddresses();
  }

  presentInput(item) {
    let alert = this.alertCtrl.create({
      title: '添加地址',
      message: '',
      inputs: [
        {
          name: 'address',
          placeholder: '请输入详细地址',
          value: item ? item.address : ''
        },
        {
          name: 'signer_name',
          placeholder: '请输入联系人姓名',
          value: item ? item.signer_name : ''
        },
        {
          name: 'signer_mobile',
          placeholder: '请输入联系人电话',
          value: item ? item.signer_mobile : ''
        }
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: data => {
            let {address, signer_name, signer_mobile} = data;
            if (address.length == 0) {
              this.showToast(this.toastCtrl, '详细地址不能为空，地址添加失败');
              return;
            }
            if (signer_name.length == 0) {
              this.showToast(this.toastCtrl, '联系人姓名不能为空，地址添加失败');
              return;
            }
            if (signer_mobile.length == 0) {
              this.showToast(this.toastCtrl, '联系人手机号码不能为空，地址添加失败');
              return;
            }
            if (!this.common.regPhone(signer_mobile)) {
              this.showToast(this.toastCtrl, '手机号码格式不正确，地址添加失败');
              return;
            }
            if (item)
              this.updateAddress(item.id, address, signer_name, signer_mobile);
            else
              this.addAddress(address, signer_name, signer_mobile);
          }
        }
      ]
    });
    alert.present();
  }

  // 添加回收地址
  addAddress(address, signer_name, signer_mobile) {
    this.rest.addAddress(address, signer_name, signer_mobile).subscribe(data => {
      this.getAddresses();
      this.showToast(this.toastCtrl, '添加成功');
    }, error => {
      this.errorMessage = <any>error;
      this.showToast(this.toastCtrl, '地址添加失败');
    });
  }

  // 修改回收地址
  updateAddress(id, address, signer_name, signer_mobile) {
    this.rest.updateAddress(id, address, signer_name, signer_mobile).subscribe(data => {
      this.getAddresses();
      this.showToast(this.toastCtrl, '修改成功');
    }, error => {
      this.errorMessage = <any>error;
      this.showToast(this.toastCtrl, '地址修改失败');
    });
  }

  // 删除回收地址列表
  deleteAddress(id) {
    this.rest.deleteAddress(id).subscribe(data => {
      this.getAddresses();
      this.showToast(this.toastCtrl, '删除成功');
    }, error => {
      this.errorMessage = <any>error;
      this.showToast(this.toastCtrl, '地址删除失败');
    });
  }

  // 获取回收地址列表
  getAddresses() {
    this.rest.getAddresses().subscribe(data => {
      this.addresses = data;
    }, error => {
      this.errorMessage = <any>error;
    });
  }

  // 确认选择回收地址
  confirmAddress(item) {
    this.viewCtrl.dismiss({item: item});
  }

  showAlert(id) {
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
            this.deleteAddress(id);
          }
        }
      ]
    });
    alert.present();
  }

  cancelConfirm() {
    this.viewCtrl.dismiss();
  }
}
