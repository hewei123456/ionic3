import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {
  errorMessage: any;
  mobile: string;
  password: string;
  confirmPwd: string;
  code: string;
  type: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider,
              public common: CommonProvider) {
    super();
    this.mobile = this.navParams.get('mobile');
    this.type = this.navParams.get('type');
  }

  register() {
    if (!this.validate()) {
      return;
    }
    let loading = this.showLoading(this.loadingCtrl, '注册');
    this.rest.register(this.mobile, this.code, this.password).subscribe(data => {
      loading.dismissAll();
      this.showToast(this.toastCtrl, '注册成功');
      this.navCtrl.popToRoot();
    }, error => {
      loading.dismissAll();
      this.errorMessage = <any>error;
    });
  }

  resetPassword() {
    if (!this.validate()) {
      return;
    }
    let loading = this.showLoading(this.loadingCtrl, '找回密码');
    this.rest.resetPassword(this.mobile, this.code, this.password).subscribe(data => {
      loading.dismissAll();
      this.showToast(this.toastCtrl, '成功');
      this.navCtrl.popToRoot();
    }, error => {
      loading.dismissAll();
      this.errorMessage = <any>error;
    });
  }

  validate() {
    if (!this.common.regCode(this.code)) {
      this.showToast(this.toastCtrl, '请输入四位验证码');
      return false;
    }
    if (!this.password) {
      this.showToast(this.toastCtrl, '请输入密码');
      return false;
    }
    if (this.password != this.confirmPwd) {
      this.showToast(this.toastCtrl, '确认密码与密码不一致，请重新确认');
      return false;
    }
    return true;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
