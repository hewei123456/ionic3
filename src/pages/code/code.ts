import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the CodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-code',
  templateUrl: 'code.html',
})
export class CodePage extends BaseUI {
  errorMessage: any;
  mobile: string;
  type: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider,
              public common: CommonProvider) {
    super();
    this.type = this.navParams.get('type');
  }

  getCode() {
    let loading = this.showLoading(this.loadingCtrl, '获取验证码');
    this.rest.getCode(this.mobile, this.type).subscribe(data => {
      loading.dismissAll();
      this.navCtrl.push(RegisterPage, {mobile: this.mobile, type: this.type});
    }, error => {
      loading.dismissAll();
      this.errorMessage = <any>error;
    });
  }

  hasCode() {
    if (!this.validate()) {
      return;
    }
    this.navCtrl.push(RegisterPage, {mobile: this.mobile, type: this.type});
  }

  validate() {
    if (!this.mobile) {
      this.showToast(this.toastCtrl, '请输入手机号');
      return false;
    }
    if (!this.common.regPhone(this.mobile)) {
      this.showToast(this.toastCtrl, '手机号码格式非法');
      return false;
    }
    return true;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
