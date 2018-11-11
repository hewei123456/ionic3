import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {CodePage} from "../code/code";
import {RestProvider} from "../../providers/rest/rest";
import {CommonProvider} from "../../providers/common/common";
import {StorageProvider} from "../../providers/storage/storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {
  errorMessage: any;
  username: string;
  password: string;

  constructor(public navCtrl: NavController,
              public rest: RestProvider,
              public common: CommonProvider,
              public storage: StorageProvider,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    super();
  }

  login() {
    if (!this.validate()) {
      return;
    }
    let loading = this.showLoading(this.loadingCtrl, '登录中');
    this.rest.login(this.username, this.password)
      .subscribe(data => {
        this.storage.setItem('authorization', data.token);
        this.storage.setItem('userId', data.user_id);
        loading.dismissAll();
        this.showToast(this.toastCtrl, '登录成功');
        this.viewCtrl.dismiss();
      }, error => {
        loading.dismissAll();
        this.errorMessage = <any>error;
      });
  }

  validate() {
    if (!this.username) {
      this.showToast(this.toastCtrl, '请输入手机号');
      return false;
    }
    if (!this.common.regPhone(this.username)) {
      this.showToast(this.toastCtrl, '手机号码格式非法');
      return false;
    }
    if (!this.password) {
      this.showToast(this.toastCtrl, '请输入密码');
      return false;
    }
    return true;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goRegister() {
    this.navCtrl.push(CodePage, {type: 'register'});
  }

  goRestPassword() {
    this.navCtrl.push(CodePage, {type: 'resetPassword'});
  }
}
